import axios from "axios";

export const instance = axios.create({
  // baseURL: "http://52.79.146.233:3000",
  baseURL: process.env.REACT_APP_API_URL
});

export const apis = {
  login: async (email: string, password: string) =>
    instance.post("/auth/signin", { email, password }),
  register: async (email: string, password: string, phone:string) =>
    instance.post("/auth/signup", { email, password, phone }),
  SignInWithKakao: async (id:string) =>
    instance.post("/auth/signin/kakao", { id }),
  signupWithKakao: async (payload:{ id:string, nickname:string, email:string|null }) =>
    instance.post("/auth/signup/kakao", payload),

  // getUserInfo: async () =>
  //   instance.get("/users/detail", {
  //     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //   }),
  /* getDevices: () =>
    instance.get("/devices", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }),
  getDevice: (id: string) => {
    instance.get(`/devices/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  }, */
  /* updateDevice: (device_id: string, field: any) => {
    instance.put(`/devices/${device_id}`, field, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  }, */
  getUserDevices: (userId:number) => 
    instance.get(`/device/user-device?userId=${userId}`),
  getDeviceCurrentStatus: (userId:number) => 
    instance.get(`/device/user-device/current-status?userId=${userId}`),
  getDeviceStatus: (id:string, userId:number) => 
    instance.get(`/device/user-device/${id}/status?userId=${userId}`),
  getDeviceConfigs: (userId:number) =>
    instance.get(`/device/user-device/current-configs?userId=${userId}`),
  registerDevice: (id:string, userId:number) => 
    instance.post('/device/user-device/register', { id, userId }),
  unregisterDevice: (id:string, userId:number) => 
    instance.post('/device/user-device/unregister', { id, userId }),
  controlDevice: (deviceId:string, userId:number, payload:{ [key:string]: number }) =>
    instance.post('/device/user-device/config', { deviceId, userId, payload }),
  
  updateAllDevice: (field: any) => {
    instance.put("/devices", field, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  },
  deleteDevice: (device_id: string) => {
    instance.delete(`/devices/${device_id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  },
  getLocation: () =>
    axios.get(
      `https://api.bigdatacloud.net/data/ip-geolocation?localityLanguage=ko&key=c8702a97debe47f2afba794def1d2b09`
    ),
  createRequest: (formdata: any) =>
    instance.post('/request', formdata, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  getNotices: () => instance.get("/notice"),
  sendVerifyCode: (phone:string) => instance.post(`/auth/sms/send-code`, { phone }),
  verifyCode: (phone:string, code:string) => instance.post(`/auth/sms/verify-code`, { phone, code })
};
