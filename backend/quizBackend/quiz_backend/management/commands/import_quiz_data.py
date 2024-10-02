import requests
import html
from django.core.management.base import BaseCommand
from django.utils import timezone
from django.db import transaction
from quiz_backend.models import Question, Choice

class Command(BaseCommand):
    help = 'Imports quiz data from an external API and saves it to the database'

    def handle(self, *args, **kwargs):
        self.fetch_and_save_questions()
    
    def fetch_and_save_questions(self):
        try:
            url = "https://opentdb.com/api.php?amount=10&category=9&type=multiple"
            response = requests.get(url)
            response.raise_for_status()  # This will raise an HTTPError if the HTTP request returned an unsuccessful status code
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

        with transaction.atomic():  # Atomic transaction
            for item in questions:
                category_name = html.unescape(item.get('category', ''))
                question_text = html.unescape(item.get('question', ''))
                correct_answer = html.unescape(item.get('correct_answer', ''))
                incorrect_answers = item.get('incorrect_answers', [])

                if not question_text or not correct_answer or not incorrect_answers:
                    self.stdout.write(self.style.WARNING(f"Skipping invalid data: {item}"))
                    continue

                try:
                    # Create question
                    question = Question.objects.create(
                        category=category_name,
                        question_text=question_text,
                        difficulty=item.get('difficulty', 'easy'),
                        pub_date=timezone.now()
                    )

                    # Create correct answer
                    Choice.objects.create(
                        question=question,
                        choice_text=correct_answer,
                        is_correct=True
                    )

                    # Create incorrect answers
                    for answer in incorrect_answers:
                        Choice.objects.create(
                            question=question,
                            choice_text=html.unescape(answer),
                            is_correct=False
                        )
                    
                    self.stdout.write(self.style.SUCCESS(f"Added question: {question_text}"))

                except Exception as e:
                    self.stdout.write(self.style.ERROR(f"An error occurred while saving to the database: {e}"))