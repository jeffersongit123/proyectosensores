import pandas as pd
import numpy as np
from datetime import datetime, timedelta

# Definir los rangos de peso para cada nivel de llenado
niveles = {
    'bajo': range(0, 16),
    'medio': range(16, 31),
    'alto': range(31, 46),
    'rebosado': range(46, 51)
}

# Crear listas para almacenar los datos
fechas = []
horas = []
pesos = []
etiquetas = []
desbordado = []
temperaturas = []
humedades = []
dias_semana = []
eventos_especiales = []
tipos_residuos = []
contenedores_cercanos = []
barrio = 'barrio nuevo coca'

# Definir valores posibles para las nuevas variables
dias_semana_posibles = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
tipos_residuos_posibles = ['orgánico', 'reciclable', 'no reciclable']
eventos_especiales_posibles = [0, 1]  # 0: No, 1: Sí
contenedores_cercanos_posibles = range(1, 6)

# Generar datos
start_date = datetime(2024, 6, 6, 0, 0)
for i in range(350):
    # Calcular fecha y hora
    fecha_hora = start_date + timedelta(minutes=30 * i)
    fechas.append(fecha_hora.strftime('%Y-%m-%d'))
    horas.append(fecha_hora.strftime('%H:%M:%S'))
    
    # Elegir un nivel de llenado aleatorio basado en pesos y etiquetas
    nivel = np.random.choice(list(niveles.keys()))
    peso = np.random.choice(niveles[nivel])
    
    # Generar valores para las nuevas variables
    temperatura = round(np.random.uniform(15, 35), 1)  # Temperatura en grados Celsius
    humedad = round(np.random.uniform(30, 90), 1)  # Humedad en porcentaje
    dia_semana = dias_semana_posibles[fecha_hora.weekday()]
    evento_especial = np.random.choice(eventos_especiales_posibles)
    tipo_residuo = np.random.choice(tipos_residuos_posibles)
    contenedores_cercano = np.random.choice(contenedores_cercanos_posibles)
    
    # Añadir los valores a las listas
    pesos.append(peso)
    etiquetas.append(nivel)
    desbordado.append(1 if nivel == 'rebosado' else 0)
    temperaturas.append(temperatura)
    humedades.append(humedad)
    dias_semana.append(dia_semana)
    eventos_especiales.append(evento_especial)
    tipos_residuos.append(tipo_residuo)
    contenedores_cercanos.append(contenedores_cercano)

# Crear DataFrame
df = pd.DataFrame({
    'fecha': fechas,
    'hora': horas,
    'peso': pesos,
    'nivel_llenado': etiquetas,
    'desbordado': desbordado,
    'temperatura': temperaturas,
    'humedad': humedades,
    'dia_semana': dias_semana,
    'evento_especial': eventos_especiales,
    'tipo_residuo': tipos_residuos,
    'contenedores_cercanos': contenedores_cercanos,
    'barrio': [barrio] * 350
})

# Guardar en un archivo Excel
df.to_excel('datos_basura_antesuno.xlsx', index=False)

print(df)

