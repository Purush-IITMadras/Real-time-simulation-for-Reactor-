from flask import Flask, render_template, url_for, request, jsonify, request, make_response
from scipy.integrate import odeint
import numpy as np

app = Flask(__name__)

# function that returns dy/dt
def model(z,t,k,A,Fin,Tin,Q,rhocp):
    h=z[0]
    T=z[1]
    #print('in model')
    #print("\nIn model\n",Fin,Q)
    dhdt = (1/A)*(Fin-(k * np.sqrt(h)))
    dTdt = ((Fin/(A*h))*(Tin-T))+(Q/(A*h*rhocp))
    return  [dhdt ,dTdt]

@app.route('/')
def get_entry():
    return render_template('index.html')

@app.route('/process-entry', methods=['POST'])
def process_entry():
    req = request.get_json()

    flow_inlet = float(req['flow_inlet']) # F_in
    heat_inlet = float(req['heat_inlet']) # Q
    initial_level = float(req['initial_level']) 
    #print("\nType",type(flow_inlet),type(heat_inlet))


    #print("In process entry\n",flow_inlet,heat_inlet,initial_level)
    
    # initial condition
    z = [initial_level, 300]
    k = 0.1
    A = 0.2
    T_in = 300
    rho_cp = 4000000
    t = np.linspace(0, 1)
    # t = np.linspace(float(req['time1']),float(req['time2']))     

    y2  = odeint(model, z, t, args=(k, A, flow_inlet, T_in, heat_inlet, rho_cp))
    # y2 = model(z,t,k,A,flow_inlet,T_in,heat_inlet,rhocp)
    # print(y2)rho_cp
    liquid_level = y2[:, 0].tolist()
    temperature = y2[:, 1].tolist()
    time = t.tolist()
    liquid_level = [round(num, 2) for num in liquid_level]
    temperature = [round(num, 2) for num in temperature]
    time = [round(num, 2) for num in time]

    result = {
        "liquid_level": liquid_level,
        "temperature": temperature,
        "time": time
    }
    res = make_response(jsonify(result), 200)
    return res
