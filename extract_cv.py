"""
Script para extraer texto de PDF
"""
try:
    import PyPDF2
    
    # Abrir el PDF
    with open('mi_cv_real.pdf', 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        
        # Extraer texto de todas las páginas
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text() + "\n"
        
        # Guardar en archivo de texto
        with open('cv_extraido.txt', 'w', encoding='utf-8') as f:
            f.write(text)
        
        print("Texto extraido exitosamente!")
        print("=" * 50)
        print(text)
        
except ImportError:
    print("Instalando PyPDF2...")
    import subprocess
    subprocess.run(['pip', 'install', 'PyPDF2'], check=True)
    print("Instalado. Ejecuta el script nuevamente.")
except Exception as e:
    print(f"Error: {e}")
