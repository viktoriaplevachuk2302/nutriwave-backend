const admin = require('firebase-admin');

const serviceAccount = {
  "type": "service_account",
  "project_id": "nutriwave-60a92",
  "private_key_id": "d1bca34a6c110fafba5e262dad510aeb397b20e0",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC3xBsVN7jpAt3y\nXpu4UI/taxiXUqAsK1dFH7h3srYQYbfYi7mzrQV024I8igPtLlxIHtJNSj3lM8fj\nKIDHXK97gsXpuLwm8eYqTSKp0fy/ApBSSMy/art/etSvcUZyqDEqOqlzFIihdrQp\nUU1353z8M9ElRptitPlelJz50haYgvgvFW66SqM0GOj56XuZR0kv+pf48wLlFe/B\nkgV53tLziU2OGDnS6CBkSLXqBwSmqn+BcV118868BnhNM1CTFuYXq4ZsNBucWunD\nAdPb7I32+uIqWCitriHoPHzeDEP+0GR3usQv5Dt07Lgo2sU9nZ9r2zw/EFqSe6c8\nBAzbsW63AgMBAAECggEAMCz0IKrcChIbV3fgAQD1ynsiFkGuBgZSuadoN9EdE8xa\nYyW2SFlardkCGpbgEqTtwmZ6IZMOCPF7PJ0Yraspwgp1kiFBCkCuY3aXWMfZJ8Yn\nSbsWGjSD9RahfWEH4/Ud9oEsfSPr8dBpyM8srPt986wt70TEZasmGNqDEKc4D0EM\ne20yjUUWnP2zCCZTfbmQjCVS1FJbJuB5fSF3+ALF5sf3Y5ZwKKvckPVwcCvOO3ld\n41F6N74M+UOqfQmuvXq0G40o3gizfcOmzhhI/7VUURJ4jEnzV8Mtb1Bf77z7PSri\nFow4Jhs/qxUZi6x79E44r008WYp3Hh6N8M//HbX3sQKBgQDqFT8p6rXcjINX838f\nMYT8SlWgEVr+dSoJ5OavjFZqqj65nYXExiTzC0dGphDmldv6yVccT2VY7XzagRMs\ntKek2J7Q3ashuXP7xJj2x4HJLHsby0WDBfy8Qrn8D/+nG8/dJU/nomBgsD8EtfTC\n63u2YWR9DPg11PfrI80pRI9wSQKBgQDI+M7dHRFEzGIOZb3SfQzua1h8cnIiTv9l\nk8sKsJCto2yqvmA/VUQxuyNbPtUEpEtvp61XUZ0vkAljndfRZNt+9YNl1oJltkYe\nUaAzk01XKhZB6ZAFz2i51xIT2mNJm36JHlJikzdFX8cn8RpBMBU6++wmi/H1ngFu\niJ9PgHfm/wKBgBbLhuEgGCGoFUpFTgXNnrOq0XfK+N96rWNVRRmnQusUNROCQXqO\nCR8Z5BD/LvolccyUOsVo/eeRCO2GUEW0OfcVmTGhxH5+Pssvs+2kNAFRMZPdUaGW\nvavfm5juPekaDj3s2kEmUNhZkWl2BqXMpLl39n8u+iTT3mipjdsM8CLxAoGBAJ0I\n1VMvKFQyw5fuZfG4JseRd1Xec1JdmfC8GBZlOteC8CFGmpxCOwQE7y6YHQkAe7Vm\nNusY6ZLFoKCHMKD8hwpgOujzQXbKg2WjcGN8gR1P1I5yO0he9bzo0cZTiet1Jd1s\npQFDeRerLEoIefRf5ubs/GxuQ4UhjorZFGqhvo7vAoGAUSmIse+HtxSN4233vJR2\nfCm8R+PxVjlNRDXsGXpEq6yTVbxl4PW+La1GVULhEg0wuf6qFYFQBPH/MhBodZ/D\ndC/1NxBFC6tJEPW3nHVyuRxN0U7XyejU5Vq4WUJK8YtDKVsyAEKX9jRIbHf15AXZ\nAfUGy0hFu4Xk3t94VRSTCtA=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@nutriwave-60a92.iam.gserviceaccount.com",
  "client_id": "114428778411663336031",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40nutriwave-60a92.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: "nutriwave-60a92"
  });
}

const db = admin.firestore();

module.exports = { admin, db };