import admin from "firebase-admin"

const firebaseKey = {
  type: "service_account",
  project_id: "personal-branding-2673f",
  private_key_id: "a020a3ee0e50e861d9a350a4d0e77fefd995f580",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCdx+3iP8S2Cuv9\nwj7EGbgkVK6eFtuDF8D7Slm+nWjSgASsunjhWKBkUSqngTaHR8Hoi8KGqONoe6UT\nrBbQWpDb8h+rW+Jw3067rKqr9LrxPc3yrNmwH1Bfmdn389Oz3SH5A5ig4LHQcEU+\nx2U3Lfqq62Rnux6V3i6altvnK9PxhkJ5lLCuaGb8GgFAf3wp4pOauOIO9Btr9+hm\nWGTv1kh8HPiCuJZGaOYLE+HVVixXCKFhlUs6br+0ZWJliOZzRryo9XWsclsIPRki\ntdbvHgzsTG6E8ooODAy6RUIcI9GMzmyCIuBgjjODNk4gfDx6gKu7KAe1KUzm3dbs\nUCoC113VAgMBAAECggEAASNQqzxmgMxHXhx+iLo0F8mnO2tSyKPtN7gWOZ0NBSej\nNlO0oiYaJ18RKFrIN+WOl8zE6bpiGX4ld0+FwpmZ8zF7L6iJU42+FaBt2AZQgC4/\n7qt3I8wLWlp+YJ7Dkh0wLN7tGjaZ/F+IQFGpKzgLrMaR13sEAh9eGq39MVz25Fuz\n9yny6ymAeSgD6umtP5hkZCUpFdv+N4ea+ACivygBrMqlKe6NW7SRx2y/IdjFUcTW\nvyAj89fAkYWyc2EH4TzD8aRjZt7oCAOGisxcAqV3EyVXbLGiFox0PpbZvGqAlTXm\nx07ObfETgO1KK83muKgJPXSzgkNjCj3cYrzKLjHfgQKBgQDPjms/Fh2u1qFwDE/k\nj/cmVkEk3n+6Re2AkEIQnRXxXHezVV4LZ+xMIaPwv5VMiAiQf9xD+EtWFqKm9aGK\nGCIbLf99uXheZZE7pZuKkckYAwCRjfyxhgtZFSlNBQxDZYTevJOWSISWPBWDfcZM\nEZahBFbdD0JFtdPVFIhK8hIOBQKBgQDCm2lPDWmboFT2KZLMtkcle/RdUF3zpCap\nCqgoYpdzN02NzRnvG4wLpxORFFyWN/yJf8C/xnNZCfA97GSxbHx0ICbett8j2uCk\nQ5CnK8m75GB/ERtVuYl6wK4D7ilt0AG01av01jqo1JmEWy3kMUKPgLAlyvgDyDON\nQPAs4oZJkQKBgGdpkTvMfBuZqrPWHpRFuqFqRmjlRwR7RNtShOgcLEumg6lhdkr+\ni3hfJnyUKAIKoSHF4uwmsPqCqqW/Kq5QWeXq5CozF6sItfTfDYFcI7KIBGeBNA8L\nN2o6JerPAg4ubaZAlNRC63SjGSD7sKpD9SXisJjRunZbIuE+qq2UsLQ1AoGALckY\ntrOmJCpNsvjHBAjipkwKiyXMZPU670yFkbLYhQ/+3BzkPCBUC63MabbLrcAQV11K\nQRR0sP8ombkTW7b1dPDXlFCcIThu39bRorMnrGAn391re/jCArJwfpY7Aw4MSLp4\n0YrRlEUotT4qhuScD10slEezoFgq4NHlb/n/tDECgYEAgGnxj9m7tWIrAdpWYlPp\n7pTfEFMn8MzdB9K11UyT3nlZG0WSIneawKQEuUZqUatunrB5BQQnabxEdipaHypg\nQT4WX3xnLINelkAOxiLVhmlXeMLJ6d76zT3FJKzAqIF6L0NKcJuHi5p5PS/VXzJI\nAcxF8KxlbW+WrSIpKrgu6NM=\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-zwf6a@personal-branding-2673f.iam.gserviceaccount.com",
  client_id: "107374000893696782885",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-zwf6a%40personal-branding-2673f.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

admin.initializeApp({
  credential: admin.credential.cert(firebaseKey),
  storageBucket: "gs://personal-branding-2673f.appspot.com",
});

const storage = admin.storage();

export { storage };
