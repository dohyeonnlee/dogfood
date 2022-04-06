from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404, redirect
from .models import User
from django.contrib.auth.hashers import make_password, check_password
from django.contrib import messages

def index(request):
    # sessionUserId = request.session.get('user')
    # if sessionUserId:
    #     user = User.objects.get(userId=sessionUserId)

    return render(request, 'ddungs/main.html')

def login(request):
    # context = {}
    if request.method == "GET":
        return render(request, 'ddungs/login.html')
    else:
        loginUserId = request.POST.get('userId', None)
        loginPassword = request.POST.get('password', None)

        if not (loginUserId and loginPassword):
            messages.warning(request, "아이디와 비밀번호를 모두 입력해주세요.")
        else:
            try:
                user = User.objects.get(userId=loginUserId)
            except:
                messages.warning(request, "아이디 또는 비밀번호가 일치하지 않습니다.")
            else:
                if check_password(loginPassword, user.password):
                # if loginPassword == user.password:
                    request.session['user'] = user.userId
                    return redirect('/')
                else:
                    messages.warning(request, "아이디 또는 비밀번호가 일치하지 않습니다.")

        return render(request, 'ddungs/login.html')

def logout(request):
    request.session.pop('user')
    return redirect('/')

def signup(request):
    context = {}
    if request.method == "GET":
        return render(request, 'ddungs/signup.html')
    else:
        userId = request.POST.get('userId', None)
        password = request.POST.get('password', None)
        re_password = request.POST.get('re_password', None)
        nickname = request.POST.get('nickname', None)
        email = request.POST.get('email', None)
        mydogBreed = request.POST.get('mydogBreed', None)
        mydogSize = request.POST.get('mydogSize', None)
        preferFood = request.POST.get('preferFood', None)

        context['userId'] = userId
        context['password'] = password
        context['re_password'] = re_password
        context['nickname'] = nickname
        context['email'] = email
        context['mydogBreed'] = mydogBreed
        context['mydogSize'] = mydogSize
        context['preferFood'] = preferFood

        if not (userId and password and re_password and nickname and email and mydogBreed and
        mydogSize and preferFood):
            messages.warning(request, "모든 값을 입력하세요.")
        else:
            if password != re_password:
                messages.warning(request, "비밀번호가 다릅니다.")
            else:
                user = User(userId=userId, password=make_password(password), nickname=nickname,
                            email=email, mydogBreed=mydogBreed, mydogSize=mydogSize, preferFood=preferFood)
                user.save()
                messages.info(request, "회원가입이 완료되었습니다.")
                return redirect('/')

        return render(request, 'ddungs/signup.html', context)