#datamodelo/entrenar_modelo.py
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score
import joblib

# Cargar los datos
df = pd.read_csv('datos_basura.csv')

# Definir las características (X) y la etiqueta (y)
X = df[['peso']]
y = df['etiqueta']

# Dividir los datos en entrenamiento y prueba
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Crear y entrenar el modelo
model = DecisionTreeClassifier()
model.fit(X_train, y_train)

# Evaluar el modelo
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f'Accuracy: {accuracy * 100:.2f}%')

# Guardar el modelo entrenado
joblib.dump(model, 'modelo_basura.pkl')
