#!/usr/bin/env python3
from flask import Flask, jsonify
import math
import automationhat

app = Flask(__name__)

class Tank:
    def __init__(self, length, height, widthTop, widthBottom):
        self.length = float(length)
        self.height = float(height)
        self.widthTop = float(widthTop)
        self.widthBottom = float(widthBottom)

freshTank = Tank(2500, 620, 1200, 900)


# Calculate the volume of liquid for a tank with
# the diagrammed cross section
#
# --------------/ <-- Tank top
# |      |     /
# |      |    /
# |~~~~~~~~~~/ <-- Water Level
# |      |  /
# |      |T/ <-- Theta angle
# |-------/
def calculateVolume(tank, gaugePercentage):
    fillHeight = tank.height * gaugePercentage

    # Get the volume of the cuboid
    cuboidVolume = tank.widthBottom * tank.length * fillHeight

    # Get theta, the angle at the bottom of the tank to the sloped wall
    triLegnth = tank.widthTop - tank.widthBottom
    hypotenuse = math.sqrt(math.pow(tank.height, 2) + math.pow(triLegnth, 2))
    theta = math.acos(tank.height / hypotenuse)

    # Get the length of the water level
    triWaterLength = math.tan(theta) * fillHeight
    triangleWaterVolume = 0.5 * fillHeight * triWaterLength * tank.length

    return round((cuboidVolume + triangleWaterVolume) / 1000000.0, 2)


@app.route('/v1/water/fresh')
def freshWater():
    voltage = automationhat.analog.one.read()
    maxVoltage = 6.70
    gaugePercentage = voltage / maxVoltage

    volume = calculateVolume(freshTank, gaugePercentage)
    capacity = calculateVolume(freshTank, 1)
    volumePercentage = volume / capacity

    return jsonify({
        'voltage': voltage,
        'maxVoltage': maxVoltage,
        'volume': volume,
        'capacity': capacity,
        'volumePercentage': round(volumePercentage * 100, 2)
    })

@app.route('/v1/water/waste')
def wasteWater():
    voltage = automationhat.analog.two.read()
    maxVoltage = 6.70
    gaugePercentage = voltage / maxVoltage

    volume = calculateVolume(freshTank, gaugePercentage)
    capacity = calculateVolume(freshTank, 1)
    volumePercentage = volume / capacity

    return jsonify({
        'voltage': voltage,
        'maxVoltage': maxVoltage,
        'volume': volume,
        'capacity': capacity,
        'volumePercentage': round(volumePercentage * 100, 2)
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
