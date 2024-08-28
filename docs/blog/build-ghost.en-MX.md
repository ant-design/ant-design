---
title: Un fantasma en la compilación
date: 2023-12-20
author: zombieJ
traductor: WriestTavo
juejin_url: https://juejin.cn/post/7322352551088341019
---

Durante el mantenimiento de antd-mobile, nos encontramos con un fantasma molesto. Rara vez aparece al compilar localmente, pero casi siempre aparece en el flujo de trabajo de GitHub. Después de mucho esfuerzo, finalmente encontramos su rastro.

### CI falló... otra vez

Para el CI de antd-mobile, hay una tarea para verificar los artefactos de compilación, lo que indicará los cambios en el tamaño de los archivos. Pero en los últimos meses, esta tarea a menudo falla en la compilación, como se muestra en la siguiente figura:

![CI fallido](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*XSAESJ3_HWgAAAAAAAAAAAAADrJ8AQ/original)

Al revisar el registro, obtendremos el mensaje de error del archivo CSS:

![Unknown word](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*2ybATYq9l2oAAAAAAAAAAAAADrJ8AQ/original)

Parece que el error ocurrió al compilar el estilo 2x (antd-mobile generará estilo 2x para pantallas de alta definición):

```log
[09:44:16] Using gulpfile ~/work/ant-design-mobile/ant-design-mobile/gulpfile.js
[09:44:16] Starting 'default'...
[09:44:16] Starting 'clean'...
[09:44:17] Finished 'clean' after 286 ms
[09:44:17] Starting 'buildES'...
[09:44:26] Finished 'buildES' after 8.77 s
[09:44:26] Starting 'buildCJS'...
[09:44:27] Finished 'buildCJS' after 1.72 s
[09:44:27] Starting 'buildDeclaration'...
[09:44:27] Starting 'buildStyle'...
[09:44:28] Finished 'buildStyle' after 682 ms
[09:44:34] Finished 'buildDeclaration' after 6.5 s
[09:44:34] Starting 'copyAssets'...
[09:44:34] Finished 'copyAssets' after 2.37 ms
[09:44:34] Starting 'copyMetaFiles'...
[09:44:34] Finished 'copyMetaFiles' after 4.64 ms
[09:44:34] Starting 'generatePackageJSON'...
[09:44:34] Finished 'generatePackageJSON' after 2.72 ms
[09:44:34] Starting 'buildBundles'...
[09:44:45] Finished 'buildBundles' after 11 s
[09:44:45] Starting 'init2xFolder'...
[09:44:46] Finished 'init2xFolder' after 811 ms
[09:44:46] Starting 'build2xCSS'...
[09:44:46] 'build2xCSS' errored after 126 ms
[09:44:46] CssSyntaxError in plugin "gulp-postcss"
```

`style.css` del `build2xCSS` proviene del artefacto de `buildStyle`, por lo que se puede determinar que hay un problema en la tarea `buildStyle`. Después de revisar el archivo correspondiente `/lib/bundle/style.css`, encontramos el siguiente contenido:

![Líneas rotas](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*5NqFR6_nkhwAAAAAAAAAAAAADrJ8AQ/original)

La primera línea de `style.css` es el estilo comprimido, y luego el estilo no comprimido incompleto. Comparado con el artefacto exitoso, se verá que el estilo después de la segunda línea es inesperado:

![Estilo exitoso](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*xnDRT5SDVvMAAAAAAAAAAAAADrJ8AQ/original)

Al revisar el contenido no comprimido, descubrimos que estos contenidos ya existen en el contenido comprimido anterior:

![Contenido duplicado](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*wShGRJ16U1AAAAAAAAAAAAAADrJ8AQ/original)

Se especula que el contenido no comprimido se generó primero durante la compilación, y luego se realizó la operación de compresión. Pero hay un problema asincrónico, la segunda tarea comenzó a ejecutarse antes de que la primera tarea se completara, lo que resultó en la duplicación del contenido. Lo que es aún más extraño es que, si se trata de un problema asincrónico, el contenido del archivo de error generado en CI es sorprendentemente consistente. No importa cuántas veces se construya, siempre que falle, debe ser el mismo contenido.

### Problema concurrente

Al revisar el archivo `gulpfile.js`, encontramos que `buildStyle` utiliza vite para compilar. Considerando que podría ser un problema con la versión de la compilación, actualizamos vite de `3.x` a `5.x`, pero el problema persiste. Así que revisamos la configuración relevante:

```tsx
{
    root: process.cwd(),
    mode: env,
    logLevel: 'silent',
    define: { 'process.env.NODE_ENV': `"${env}"` },
    build: {
      cssTarget: 'chrome61',
      lib: {
        formats,
        ...
      },
      rollupOptions: {
       output: {
          dir: './lib/bundle',
          globals: {
            'react': 'React',
            'react-dom': 'ReactDOM',
          },
        },
      },
      minify: isProd ? 'esbuild' : false,
    },
  }
```
Después de desactivar la configuración logLevel: 'silent' y volver a compilar, pudimos ver más contenido en los registros:


Parece que estamos cerca de la respuesta. Al compilar, antd-mobile crea tres copias de es, cjs y umd a través de lib.formats. Y cada formato genera un archivo style.css. Si solo se tratara de sobrescribir el archivo, simplemente se desperdiciarían recursos de compilación adicionales, y el style.css comprimido siempre sería sobrescrito, por lo que no debería haber un problema de sobrescritura simultánea. Revisemos la parte que llama a vite para compilar:

```tsx
async function buildBundles(cb) {
  const envs = ['development', 'production'];
  const configs = envs.map((env) =>
    getViteConfigForPackage({
      env,
      formats: ['es', 'cjs', 'umd'],
      external: ['react', 'react-dom'],
    }),
  );

  await Promise.all(configs.map((config) => vite.build(config)));
  cb && cb();
}
```

Ahí está. Se utiliza Promise.all para compilar de manera concurrente, y la compilación de vite es asincrónica. Esto causa un problema de competencia para style.css. Rollup, que es llamado por vite, limpia los archivos y luego realiza operaciones de escritura. Dado que el estilo comprimido necesita ser minimizado, siempre es más lento que la versión no comprimida. Cuando rollup termina de limpiar y comienza a escribir archivos, aunque la primera parte de la versión no comprimida es eliminada debido a la limpieza, el contenido subsiguiente aún se escribe, mientras que la versión comprimida comienza a escribir desde el principio. Cuando ambos terminan de escribir, ocurre un error, y el contenido es consistentemente el mismo en cada compilación de CI. La solución es simple: basta con cambiar a una ejecución secuencial:

```tsx
for (const config of configs) {
  await vite.build(config);
}
```

### Conclusión
Con los cambios en el rendimiento del CI de GitHub, el fantasma que originalmente era difícil de encontrar se ha vuelto estable y reproducible, lo cual es bastante interesante. Esto también nos da la oportunidad de localizar el problema.
