from django.contrib import admin
from .models import Question, Choice

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ['question_text', 'category', 'difficulty']

@admin.register(Choice)
class ChoiceAdmin(admin.ModelAdmin):
    list_display = ['choice_text', 'is_correct', 'question']

