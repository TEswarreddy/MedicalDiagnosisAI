# import tensorflow as tf

# # Load once
# model = tf.keras.models.load_model("training/models/disease_model.h5")

# def run_model_inference(data):
#     # Just a placeholder input structure
#     input_vector = [
#         data["age"],
#         data["gender"],
#         hash(data["symptoms_text"]) % 10000,
#     ]
#     prediction = model.predict([input_vector])[0]
#     return str(prediction)
