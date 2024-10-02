from django.db import models

class Question(models.Model):
    category = models.CharField(max_length=100, blank=True, null=True)
    question_text = models.CharField(max_length=200)
    difficulty = models.CharField(max_length=50)
    pub_date = models.DateTimeField('date published')

    def __str__(self):
        return self.question_text
    
class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='choices')
    choice_text = models.CharField(max_length=200)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.choice_text