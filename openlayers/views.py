from django.shortcuts import render,redirect

def test(request):
   if request.method=='GET':
      return render(request,'index.html',{ })