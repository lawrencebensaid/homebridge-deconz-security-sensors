'use strict';

const http = require("request-promise-native");
const WebSocket = require("ws");


/**
 * @author Lawrence Bensaid <lawrencebensaid@icloud.com>
 * @since 0.1.0
 */
class DeCONZSecuritySensors {

  constructor(log, config) {
    this.log = log;
    this.target = config.target;
    const deconz = config.deconz;

    const socket = new WebSocket(`ws://${deconz.host}:${deconz.port}`);
    this.log.info(`Listening on ws://${deconz.host}:${deconz.port}`);
    
    const agents = config.sensors || {};
    
    socket.onmessage = async ({ data }) => {
        const event = JSON.parse(data);
        const { r: type, id, state } = event;
        if (type !== "sensors") return;
        if (!("state" in event) || state.open !== true) return;
        const { target_mode: mode } = await this.status();
        this.log.info(mode);
        if (!(mode in agents)) return;
        if (!agents[mode].includes(parseInt(id))) return;
        this.trigger(id);
    };
    
  }
    
  /**
   * @returns {Promise<object>} Mode
   */
  status() {
      return new Promise((resolve, reject) => {
          http(`http://${this.target.host}:${this.target.port}/status?code=${this.target.code}`, {}, (error, res, body) => {
              if (error) return reject(error);
              try {
                  resolve(JSON.parse(body));
              } catch (error) {
                  reject(error);
              }
          });
      });
  }

  /**
   * @param {string} id Sensor ID
   */
  trigger(id) {
      this.log.info(`[SENSOR ${id}]: TRIGGER`);
      http(`http://${this.target.host}:${this.target.port}/triggered?code=${this.target.code}`, {}, (error, res, body) => {
          if (error) return this.log.info(error);
          const fail = JSON.parse(body).error;
          if (fail) return this.log.info(`[SENSOR ${id}]: FAILED TO NOTIFY TARGET`);
      });
  }

}


module.exports = api => {

  api.registerPlatform("deCONZSecuritySensors", DeCONZSecuritySensors);

};