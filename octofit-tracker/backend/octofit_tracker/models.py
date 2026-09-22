from django.db import models


class User(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField(unique=True)
    team = models.CharField(max_length=80, blank=True)
    fitness_level = models.CharField(max_length=40, default='beginner')

    class Meta:
        db_table = 'users'

    def __str__(self):
        return self.email


class Team(models.Model):
    name = models.CharField(max_length=80, unique=True)
    description = models.TextField(blank=True)

    class Meta:
        db_table = 'teams'

    def __str__(self):
        return self.name


class Activity(models.Model):
    user_email = models.EmailField()
    activity_type = models.CharField(max_length=40)
    duration_minutes = models.PositiveIntegerField()
    distance_km = models.DecimalField(max_digits=7, decimal_places=2, default=0)
    points = models.PositiveIntegerField(default=0)
    completed_at = models.DateField()

    class Meta:
        db_table = 'activities'


class Leaderboard(models.Model):
    user_email = models.EmailField(unique=True)
    team = models.CharField(max_length=80)
    points = models.PositiveIntegerField(default=0)
    rank = models.PositiveIntegerField(default=0)

    class Meta:
        db_table = 'leaderboard'
        ordering = ['rank', 'user_email']


class Workout(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    category = models.CharField(max_length=40)
    difficulty = models.CharField(max_length=40)
    duration_minutes = models.PositiveIntegerField()

    class Meta:
        db_table = 'workouts'
