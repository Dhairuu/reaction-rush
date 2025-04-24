from django.db import models

# Create your models here.

class User(models.Model):
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    high_score = models.FloatField(default=0)

    def __str__(self):
        return f"{self.name} {self.email}"
    
class Match(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    time_stamp = models.TimeField(auto_now=True)
    accuracy = models.FloatField()
    target_hit = models.IntegerField()
    score = models.FloatField()

    def __str__(self):
        return f"Match for {self.user_id.name} at {self.time_stamp}"