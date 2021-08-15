# deCONZ Security Sensors

A Homebridge plugin to use deCONZ sensors and the `homebridge-securitysystem` plugin together

This plugin doesn't add any HomeKit accessories. It solely acts as a bridge between your deCONZ service and the `homebridge-securitysystem` Homebridge plugin.


## Pre-requisites

- Homebridge
- The [`homebridge-securitysystem`](https://github.com/MiguelRipoll23/homebridge-securitysystem) plugin
- A running deCONZ instance


## Setup

`$ npm install homebridge-deconz-security-sensors`


## Configuration

Parameters:

name|description
---|---
`platform`|Must be `deCONZSecuritySensors`. ****Required***
`target.host`|IP address (or hostname) of Security System server. ****Required***
`target.port`|port of Security System server. ****Required***
`target.code`|authentication pincode of Security System server. ****Required***
`deconz.host`|IP address (or hostname) of deCONZ rest-api. ****Required***
`deconz.port`|port of deCONZ rest-api. ****Required***
`sensors`|Should contain one or more of the following keys: `home`, `away` or `night`,. ****Required***
`sensors.home`|IDs of the deCONZ sensors to trigger during home mode. **Optional*
`sensors.away`|IDs of the deCONZ sensors to trigger during away mode. **Optional*
`sensors.night`|IDs of the deCONZ sensors to trigger during night mode. **Optional*

Configuration example:

```json
{
  "platform": "deCONZSecuritySensors",
  "target": {
      "host": "192.168.0.7",
      "port": 8582,
      "code": 0123
  },
  "deconz": {
      "host": "192.168.0.7",
      "port": 443
  },
  "sensors": {
      "night": [
          23,
          24,
          27,
          28,
          32,
          33,
          34
      ],
      "away": [
          5,
          6,
          23,
          24,
          27,
          28,
          29,
          30,
          31,
          32,
          33,
          34
      ]
  }
}
```