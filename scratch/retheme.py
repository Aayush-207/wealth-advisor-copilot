import re

with open('frontend/src/app/globals.css', 'r') as f:
    css = f.read()

# Make sure we don't touch the root variables at the top.
root_end = css.find('}') + 1
root_vars = css[:root_end]
rest_of_css = css[root_end:]

# Dark theme palette
PAPER = '#020617'
CARD = '#0E1223'
MUTED_BG = '#1A1E2F'
BORDER = '#334155'
TEXT = '#F8FAFC'
MUTED_TEXT = '#94A3B8'
ACCENT = '#22C55E'

def replace_color(match):
    hex_color = match.group(1).lower()
    
    # Text colors (dark in original)
    if hex_color in ['#262c3b', '#303847', '#29303b', '#393348', '#555b68']:
        return TEXT
    elif hex_color in ['#747880', '#666a70', '#8c8f95', '#9a94a3', '#8e859c', '#9e9ba2']:
        return MUTED_TEXT
    
    # Backgrounds (light in original)
    if hex_color.startswith('#f') or hex_color == '#fffefa' or hex_color == '#f8f7f3':
        return CARD if hex_color == '#fffefa' else PAPER
    elif hex_color.startswith('#e'):
        return BORDER if hex_color.startswith('#e6') else MUTED_BG
    elif hex_color.startswith('#d'):
        return BORDER
        
    # Purples/Accents (original purple #6356a4)
    if hex_color == '#6356a4' or hex_color.startswith('#63') or hex_color.startswith('#8b'):
        return ACCENT

    return match.group(0) # fallback

# Replace 6-digit hex
rest_of_css = re.sub(r'(#[0-9a-fA-F]{6})', replace_color, rest_of_css)

with open('frontend/src/app/globals.css', 'w') as f:
    f.write(root_vars + rest_of_css)

print("CSS colors updated.")
