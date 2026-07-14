from flask import Flask, render_template, request
import numpy as np
import pickle

app = Flask(__name__)

# ===============================
# Load Model
# ===============================

model = pickle.load(open("DiabetesPrediction.pkl", "rb"))

# Load scaler only if your model requires scaling
try:
    scaler = pickle.load(open("scaler.pkl", "rb"))
except:
    scaler = None


# ===============================
# Home Page
# ===============================

@app.route("/")
def home():
    return render_template("index.html")


# ===============================
# Prediction
# ===============================

@app.route("/predict", methods=["POST"])
def predict():

    try:

        pregnancies = float(request.form["Pregnancies"])
        glucose = float(request.form["Glucose"])
        bloodpressure = float(request.form["BloodPressure"])
        skinthickness = float(request.form["SkinThickness"])
        insulin = float(request.form["Insulin"])
        bmi = float(request.form["BMI"])
        dpf = float(request.form["DiabetesPedigreeFunction"])
        age = float(request.form["Age"])

        features = np.array([[
            pregnancies,
            glucose,
            bloodpressure,
            skinthickness,
            insulin,
            bmi,
            dpf,
            age
        ]])

        # Scale only if scaler exists
        if scaler is not None:
            features = scaler.transform(features)

        prediction = model.predict(features)[0]

        # Probability (if supported)
        confidence = None

        if hasattr(model, "predict_proba"):
            confidence = model.predict_proba(features)[0]
            confidence = round(max(confidence) * 100, 2)

        if prediction == 1:
            result = "Diabetes Detected"
            color = "red"
        else:
            result = "No Diabetes Detected"
            color = "green"

        return render_template(
            "index.html",
            prediction=result,
            confidence=confidence,
            color=color
        )

    except Exception as e:

        return render_template(
            "index.html",
            prediction="Error",
            confidence=str(e),
            color="orange"
        )


# ===============================
# Run Application
# ===============================

if __name__ == "__main__":
    app.run(debug=True)
