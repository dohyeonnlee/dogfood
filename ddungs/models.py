from django.db import models

class User(models.Model):
    userId = models.CharField(max_length=20, verbose_name='아이디')
    password = models.CharField(max_length=200, verbose_name='비밀번호')
    nickname = models.CharField(max_length=10, verbose_name='닉네임')
    email = models.CharField(max_length=50, verbose_name='이메일')
    mydogBreed = models.CharField(max_length=20, verbose_name='견종')
    mydogSize = models.CharField(max_length=3, verbose_name='반려견 크기')
    preferFood = models.CharField(max_length=10, verbose_name='선호 사료')

    def __str__(self):
        return self.userId