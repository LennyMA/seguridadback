INSERT INTO [SEGURIDAD].[DBO].[USUARIOS] (
  [CEDULAUSUARIO],
  [NOMBREUSUARIO],
  [APELLIDOUSUARIO],
  [EMAILUSUARIO],
  [CLAVEUSUARIO],
  [ROLUSUARIO]
) VALUES (
  '18000',
  'Kevin',
  'Alvear',
  'kalvear8000@uta.edu.ec',
  '12345',
  'Administrador'
),
(
  '18001',
  'Diego',
  'Cata',
  'dcata8001@uta.edu.ec',
  '12345',
  'Secretaria'
),
(
  '18002',
  'Lenin',
  'Moreno',
  'lmoreno8002@uta.edu.ec',
  '12345',
  'Administrador'
),
(
  '18003',
  'Farid',
  'Ruano',
  'fruano8003@uta.edu.ec',
  '12345',
  'Secretaria'
),
(
  '18004',
  'usuario4',
  'usuario4',
  'usuario8004@uta.edu.ec',
  '12345',
  'Administrador'
)
 --delete ALL
 -- DELETE FROM [seguridad].[DBO].[Usuarios]
 --select
  SELECT
    *
  FROM
    [SEGURIDAD].[DBO].[USUARIOS]
 -- para crear un valor unico en idAdminPer y que me deje ingresar valores null
    CREATE UNIQUE NONCLUSTERED INDEX UQ_IDADMINPER_NOTNULL
    ON FACULTADES (IDADMINPER)
  WHERE
    IDADMINPER IS NOT NULL;