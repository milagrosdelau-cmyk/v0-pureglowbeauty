# Database Setup Instructions

## Para ejecutar el setup de la base de datos en Supabase:

1. Ve a tu proyecto Supabase en https://app.supabase.com
2. Selecciona tu proyecto (PureGlowBeauty)
3. Ve a SQL Editor en la sidebar izquierda
4. Click en "New query"
5. Copia todo el contenido del archivo `001_setup_auth_database.sql`
6. Pégalo en el editor SQL
7. Click en "Run"

## Lo que se crea:

- **profiles table**: Almacena información de usuario (email, nombre, avatar, país, moneda preferida, idioma)
- **orders table**: Almacena órdenes de compra con detalles, estado y información de envío
- **analytics_events table**: Registra eventos de usuario para tracking y analytics
- **Triggers automáticos**: Crea automáticamente un perfil cuando un usuario se registra
- **Row Level Security (RLS)**: Protege los datos para que cada usuario solo vea sus propios datos

## Configurar Google OAuth en Supabase:

1. Ve a Authentication > Providers
2. Busca "Google"
3. Click en el botón para habilitar
4. Obtén tus Google OAuth credentials desde Google Cloud Console
5. Pega Client ID y Client Secret
6. En Redirect URLs, asegúrate que está: `https://your-project.supabase.co/auth/v1/callback`

## Nota sobre v0:

En v0, todo esto se puede configurar desde el panel de Settings del proyecto. 
No necesitas salir de v0 para completar la configuración.
