import React, { useState, useEffect } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const GaugePage = () => {
  const [temperature, setTemperature] = useState(generateRandomTemperature())
  const [humidity, setHumidity] = useState(generateRandomHumidity())
  const [alarmActive, setAlarmActive] = useState(false)

  function generateRandomTemperature() {
    return (Math.random() * 50).toFixed(1) 
  }

  function generateRandomHumidity() {
    return (Math.random() * 70 + 20).toFixed(1)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const newTemperature = generateRandomTemperature()
      const newHumidity = generateRandomHumidity()

      setTemperature(newTemperature)
      setHumidity(newHumidity)

      if (parseFloat(newTemperature) > 25) {
        setAlarmActive(true)
      } else {
        setAlarmActive(false)
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  // New useEffect to update the message
  useEffect(() => {
    console.log(`New Temperature: ${temperature}°C, New Humidity: ${humidity}%`) // Log to the console
  }, [temperature, humidity])

  const temperaturePercentage = Math.max(parseFloat(temperature) / 50, 0)
  const humidityPercentage = parseFloat(humidity) / 100

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
        <div style={{ textAlign: 'center', marginRight: '40px' }}>
          <h2>Temperature (°C)</h2>
          <CircularProgressbar
            value={temperaturePercentage * 100}
            text={`${temperature}°C`}
            styles={{
              path: {
                stroke: '#FF5733',
                strokeWidth: 8,
                transform: 'rotate(-90deg)', // Half-circle rotation
                transformOrigin: '50% 50%',
              },
              text: { fill: '#FF5733', fontSize: '20px' },
              trail: { stroke: '#d6d6d6', strokeWidth: 8 },
            }}
          />
        </div>

        <div style={{ textAlign: 'center' }}>
          <h2>Humidity (%)</h2>
          <CircularProgressbar
            value={humidityPercentage * 100}
            text={`${humidity}%`}
            styles={{
              path: { stroke: '#33FF57', strokeWidth: 8 },
              text: { fill: '#33FF57', fontSize: '20px' },
              trail: { stroke: '#d6d6d6', strokeWidth: 8 }
            }}
          />
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h3>Alarm Status: {alarmActive ? 'Active' : 'Inactive'}</h3>
      </div>
    </div>
  )
}

export default GaugePage