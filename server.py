#!/usr/bin/env python3
from flask import Flask, jsonify
import automationhat

app = Flask(__name__)

@app.route('/v1/water/fresh')
def freshWater():
    return jsonify({
        'voltage': automationhat.analog.one.read()
    })

@app.route('/v1/water/waste')
def wasteWater():
    return jsonify({
        'voltage': automationhat.analog.two.read()
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
