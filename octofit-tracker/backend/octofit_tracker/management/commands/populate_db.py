from datetime import date

from django.core.management.base import BaseCommand

from octofit_tracker.models import Activity, Leaderboard, Team, User, Workout


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()

        Team.objects.bulk_create([
            Team(name='marvel', description='Heróis da Marvel em movimento.'),
            Team(name='dc', description='Heróis da DC em movimento.'),
        ])

        users = [
            User(name='Peter Parker', email='peter.parker@octofit.example', team='marvel', fitness_level='intermediate'),
            User(name='Carol Danvers', email='carol.danvers@octofit.example', team='marvel', fitness_level='advanced'),
            User(name='Diana Prince', email='diana.prince@octofit.example', team='dc', fitness_level='advanced'),
            User(name='Bruce Wayne', email='bruce.wayne@octofit.example', team='dc', fitness_level='intermediate'),
        ]
        User.objects.bulk_create(users)

        Activity.objects.bulk_create([
            Activity(user_email=users[0].email, activity_type='running', duration_minutes=35, distance_km=5.2, points=52, completed_at=date.today()),
            Activity(user_email=users[1].email, activity_type='strength', duration_minutes=45, distance_km=0, points=60, completed_at=date.today()),
            Activity(user_email=users[2].email, activity_type='walking', duration_minutes=50, distance_km=4.1, points=41, completed_at=date.today()),
            Activity(user_email=users[3].email, activity_type='running', duration_minutes=40, distance_km=6.0, points=60, completed_at=date.today()),
        ])

        Leaderboard.objects.bulk_create([
            Leaderboard(user_email=users[1].email, team='marvel', points=60, rank=1),
            Leaderboard(user_email=users[3].email, team='dc', points=60, rank=2),
            Leaderboard(user_email=users[0].email, team='marvel', points=52, rank=3),
            Leaderboard(user_email=users[2].email, team='dc', points=41, rank=4),
        ])

        Workout.objects.bulk_create([
            Workout(title='Teia de Velocidade', description='Intervalos curtos de corrida para ganhar agilidade.', category='running', difficulty='intermediate', duration_minutes=30),
            Workout(title='Forca da Amazona', description='Circuito de forca para corpo inteiro.', category='strength', difficulty='advanced', duration_minutes=45),
            Workout(title='Patrulha de Gotham', description='Caminhada progressiva para melhorar resistencia.', category='walking', difficulty='beginner', duration_minutes=35),
        ])

        self.stdout.write(self.style.SUCCESS('Banco octofit_db populado com dados de teste.'))