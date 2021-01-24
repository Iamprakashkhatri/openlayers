from django.shortcuts import render,redirect

def test(request):
   if request.method=='GET':
      return render(request,'index.html',{ })
def animation(request):
	if request.method =='GET':
		return render(request,'animationindex.html')

def lodhaindex(request):
	if request.method=='GET':
		return render(request,'lodhaindex.html')