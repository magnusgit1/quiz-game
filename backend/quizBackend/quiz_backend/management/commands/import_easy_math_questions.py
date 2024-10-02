
import json
from django.core.management.base import BaseCommand
from django.utils import timezone
from django.db import transaction
from quiz_backend.models import Question, Choice

class Command(BaseCommand):
    help = 'Imports math quiz data from a JSON file and saves it to the database'

    def add_arguments(self, parser):
        parser.add_argument('filepath', type=str, help='The path to the JSON file containing the quiz questions')

    def handle(self, *args, **kwargs):
        filepath = kwargs['filepath']
        with open(filepath, 'r') as file:
            questions_data = json.load(file)

        with transaction.atomic():
            for item in questions_data:
                category = item['category']
                question_text = item['question_text']
                difficulty = item['difficulty']
                correct_answer = item['correct_answer']
                incorrect_answers = item['incorrect_answers']

                try:
                    question, created = Question.objects.get_or_create(
                        category=category,
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
                                choice_text=answer,
                                is_correct=False
                            )
                        self.stdout.write(self.style.SUCCESS(f"Added question: {question_text}"))
                    else:
                        self.stdout.write(self.style.WARNING(f"Question already exists: {question_text}"))

                except Exception as e:
                    self.stdout.write(self.style.ERROR(f"An error occurred while saving to the database: {e}"))