from django.contrib import admin

from .models import Activity, Leaderboard, Team, User, Workout

admin.site.register([User, Team, Activity, Leaderboard, Workout])
