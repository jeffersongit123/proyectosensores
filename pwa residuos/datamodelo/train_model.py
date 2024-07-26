import pandas as pd
from sklearn.tree import DecisionTreeClassifier
import joblib
import matplotlib.pyplot as plt
from sklearn import tree

# Cargar y preparar los datos
data = pd.read_csv('datos_basura.csv')
print(data.columns)  # Verificar los nombres de las columnas

X = data[['peso']]
y = data['etiqueta']  # Ajustar el nombre de la columna objetivo

# Entrenar el modelo
model = DecisionTreeClassifier()
model.fit(X, y)

# Guardar el modelo entrenado
joblib.dump(model, 'modelo_basura.pkl')

# Crear un gráfico del árbol de decisión
plt.figure(figsize=(20,10))
tree.plot_tree(model, feature_names=['peso'], class_names=model.classes_, filled=True, rounded=True)
plt.savefig('arbol_decision.png')
