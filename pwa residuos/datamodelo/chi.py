import numpy as np
from scipy.stats import chi2_contingency

# Datos de la tabla de contingencia
data = np.array([[29, 2], 
                 [97, 2], 
                 [34, 14], 
                 [6, 92], 
                 [3, 59]])

# Aplicar la prueba de chi-cuadrado
chi2, p, dof, expected = chi2_contingency(data)

# Mostrar resultados
print("Chi-cuadrado:", chi2)
print("Valor p:", p)



