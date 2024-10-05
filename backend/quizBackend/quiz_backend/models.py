from django.db import models

#Creating the Questions-table
class Question(models.Model):
    category = models.CharField(max_length=100, blank=True, null=True)
    question_text = models.CharField(max_length=200)
    difficulty = models.CharField(max_length=50)
    pub_date = models.DateTimeField('date published')

    def __str__(self):
        return self.question_text

#Creating the Choice-table
class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='choices')
    choice_text = models.CharField(max_length=200)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.choice_text

#Creating the Leaderboard-table
class Leaderboard(models.Model):
    CATEGORY_CHOICES = [
        ('science: mathematics', 'Science: Mathematics'),
        ('geography', 'Geography'),
        ('general knowledge', 'General Knowledge'),
    ]
    username = models.CharField(max_length=100)
    score = models.IntegerField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)

    def __str__(self):
        return f'{self.username} - {self.score} ({self.category})'