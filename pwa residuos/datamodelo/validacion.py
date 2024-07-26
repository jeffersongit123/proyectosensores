import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score, KFold
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

# Crear el modelo
model = DecisionTreeClassifier()

# Validación cruzada con K-Fold
kfold = KFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(model, X_train, y_train, cv=kfold, scoring='accuracy')

print(f'Cross-Validation Scores: {scores}')
print(f'Mean CV Accuracy: {scores.mean() * 100:.2f}%')
print(f'Standard Deviation of CV Accuracy: {scores.std() * 100:.2f}%')

# Entrenar el modelo con todos los datos de entrenamiento
model.fit(X_train, y_train)

# Evaluar el modelo en el conjunto de prueba
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f'Test Accuracy: {accuracy * 100:.2f}%')

# Guardar el modelo entrenado
joblib.dump(model, 'modelo_basurados.pkl')
