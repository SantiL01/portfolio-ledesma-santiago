CREATE DATABASE IF NOT EXISTS portfolio CHARACTER SET utf8mb4;
USE portfolio;

CREATE TABLE IF NOT EXISTS proyectos (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  nombre      VARCHAR(100) NOT NULL,
  descripcion TEXT NOT NULL,
  tecnologias VARCHAR(255) NOT NULL,
  imagen      VARCHAR(255),
  enlace      VARCHAR(255),
  estado      ENUM('publicado', 'borrador') NOT NULL DEFAULT 'borrador'
);

INSERT INTO proyectos (nombre, descripcion, tecnologias, imagen, enlace, estado) VALUES
('TechDex',
 'Aplicación de gestión de turnos para la empresa de servicio técnico TechDex.',
 'Java, Swing, JPA',
 'img/TD-cap1.png',
 'https://github.com/SantiL01/TechDex',
 'publicado'),
('E-commerce',
 'Una página web de comercio electrónico para la venta de productos. (En desarrollo)',
 'HTML, CSS, JavaScript, PHP, Laravel, MySQL',
 NULL,
 NULL,
 'publicado'),
('App de presupuestos',
 'Aplicación móvil para generar presupuestos a clientes. Compatible solo en Android.',
 'Java, Android Studio',
 NULL,
 'https://github.com/SantiL01/PresupuestarioV2',
 'publicado');