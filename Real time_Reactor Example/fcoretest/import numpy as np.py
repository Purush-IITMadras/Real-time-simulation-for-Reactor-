import numpy as np
from scipy.integrate import odeint
import matplotlib.pyplot as plt

# function that returns dy/dt
def model1euler(h,t0,t1,approxstep,k,A,Fin,Tin,Q,rhocp): 
    #print("inital:h \n",h)
    t=t0
    while (t<t1):
      h=h+approxstep*(float((1/A)*(Fin-k * np.sqrt(h))))
      t = t + approxstep
    return h

# initial condition
A=0.2
Tin=300.0
rhocp=4000000.0
Q=30000.0
k = 0.1
i=0
time=[]
plotlist=[]
user=1
h0 = 0.1; 
t0 = 0;
t1= 20000;
approxstep=0.01
y2=h0
 
while t0<20000:
  print("Do you want to enter Flowinlet?If yes press 1 else 0")
  num = int(input("Enter a number  :"))
  if num==1:
    Fin = float(input("Enter a Flowinlet:"))
    
    print(t0)
    
    y2 = model1euler(y2,t0,t0+1,approxstep,k,A,Fin,Tin,Q,rhocp) 
    
    
    plotlist.append(y2)
    time.append(t0+1)
    t0=t0+1;
    print(plotlist)
    print(time,plotlist)
    plt.plot(time,plotlist,'b--',linewidth=2,label='k=0.1')

    plt.show()    
  else:
   break