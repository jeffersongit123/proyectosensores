
#datamodelo/generar_datos.py
import pandas as pd
import numpy as np

# Definir los rangos de peso para cada nivel de llenado
niveles = {
    'bajo': range(0, 16),
    'medio': range(16, 31),
    'alto': range(31, 46),
    'rebosado': range(46, 51)
}

# Crear listas para almacenar los datos
pesos = []
etiquetas = []

# Generar datos
for etiqueta, rango in niveles.items():
    for peso in rango:
        pesos.append(peso)
        etiquetas.append(etiqueta)

# Crear DataFrame
df = pd.DataFrame({'peso': pesos, 'etiqueta': etiquetas})

# Guardar en un archivo CSV
df.to_csv('datos_basura.csv', index=False)

print(df)
