import requests
import html
from django.core.management.base import BaseCommand
from django.utils import timezone
from django.db import transaction
from quiz_backend.models import Question, Choice
import time

class Command(BaseCommand):
    help = 'Imports quiz data from an external API and saves it to the database'

    def handle(self, *args, **kwargs):
        difficulties = ["easy", "medium", "hard"]
        categories = [9, 19, 22, 5018, 4113]
        questions_per_difficulty = 50
        questions_per_call = 10  # API-hentingsgrensen

        for difficulty in difficulties:
            for category in categories:
                total_fetched = 0
                while total_fetched < questions_per_difficulty:
                    self.fetch_and_save_questions(category, difficulty, questions_per_call)
                    total_fetched += questions_per_call
                    time.sleep(2)  # Pauser i 2 sekunder mellom hver forespørsel for å unngå rate limiting

    def fetch_and_save_questions(self, category, difficulty, questions_per_call):
        try:
            url = f"https://opentdb.com/api.php?amount={questions_per_call}&category={category}&difficulty={difficulty}&type=multiple"
            response = requests.get(url)
            response.raise_for_status()
            data = response.json()
        except requests.RequestException as e:
            self.stdout.write(self.style.ERROR(f"An error occurred while fetching data: {e}"))
            return
        except ValueError as e:
            self.stdout.write(self.style.ERROR(f"An error occurred while parsing JSON data: {e}"))
            return

        questions = data.get('results', [])
        if not questions:
            self.stdout.write(self.style.WARNING("No questions were returned from the API."))
            return

        with transaction.atomic():
            for item in questions:
                category_name = html.unescape(item.get('category', ''))
                question_text = html.unescape(item.get('question', ''))
                correct_answer = html.unescape(item.get('correct_answer', ''))
                incorrect_answers = item.get('incorrect_answers', [])

                if not question_text or not correct_answer or not incorrect_answers:
                    self.stdout.write(self.style.WARNING(f"Skipping invalid data: {item}"))
                    continue

                try:
                    question, created = Question.objects.get_or_create(
                        category=category_name,
                        question_text=question_text,
                        difficulty=difficulty,
                        defaults={'pub_date': timezone.now()}
                    )

                    if created:
                        Choice.objects.create(
                            question=question,
                            choice_text=correct_answer,
                            is_correct=True
                        )

                        for answer in incorrect_answers:
                            Choice.objects.create(
                                question=question,
                                choice_text=html.unescape(answer),
                                is_correct=False
                            )
                        self.stdout.write(self.style.SUCCESS(f"Added question: {question_text}"))
                    else:
                        self.stdout.write(self.style.WARNING(f"Question already exists: {question_text}"))

                except Exception as e:
                    self.stdout.write(self.style.ERROR(f"An error occurred while saving to the database: {e}"))