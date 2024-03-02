-- decimos que base de datos queremos meter
USE tatoo_studio;
-- copiamos datos delmokarroo
insert into roles (id, name) values (1, 'user');
insert into roles (id, name) values (2, 'admin');
insert into roles (id, name) values (3, 'super_admin');

-- datos de usuario // lacontraseña de todo es 123456 hasheada
insert into users (id, first_name, last_name, email, password, role_id) values (1, 'user','user', 'user@user.com', '$08$P4drqj8yJSeRKnbZ7.tenO27WF6QjDdLKFwlviwoe7SfQHkxof0wa', 1);
insert into users (id, first_name, last_name, email, password, role_id) values (2, 'admin','user', 'admin@admin.com', '$08$P4drqj8yJSeRKnbZ7.tenO27WF6QjDdLKFwlviwoe7SfQHkxof0wa', 2);
insert into users (id, first_name, last_name, email, password, role_id) values (3, 'superadmin','user', 'superadmin@superadmin.com', '$08$P4drqj8yJSeRKnbZ7.tenO27WF6QjDdLKFwlviwoe7SfQHkxof0wa', 3);
insert into users (id, first_name, last_name, email, password, role_id) values (4, 'Giacinta','Lopez', 'gfidgeon3@wordpress.com', '$08$P4drqj8yJSeRKnbZ7.tenO27WF6QjDdLKFwlviwoe7SfQHkxof0wa', 1);
insert into users (id, first_name, last_name, email, password, role_id) values (5, 'Dunstan','sd','dmower4@soup.io', '$08$P4drqj8yJSeRKnbZ7.tenO27WF6QjDdLKFwlviwoe7SfQHkxof0wa', 1);
insert into users (id, first_name, last_name, email, password, role_id) values (1, 'Bettye', 'Crutcher', 'bcrutcher0@reddit.com', '$2a$04$1J3F2y3vb7/WOlYr8/q9neSV.H2YtYhoABu5vFxBiAPhKZXfOAYjS', 1);
insert into users (id, first_name, last_name, email, password, role_id) values (2, 'Fee', 'Guierre', 'fguierre1@bloglovin.com', '$2a$04$Azr3Ypc5d5ZFhwrCXRVqXeLm9fEeOknnhnK9reMTw0fipDk4O8Jse', 1);
insert into users (id, first_name, last_name, email, password, role_id) values (3, 'Lexie', 'Sturch', 'lsturch2@seesaa.net', '$2a$04$MLzYO9iPvoJTKAhzMMVdF.VeRq1aKYZ8U48LR8VFEnPULN6m70306', 1);
insert into users (id, first_name, last_name, email, password, role_id) values (4, 'Jordon', 'MacConnel', 'jmacconnel3@github.com', '$2a$04$Q0gUnjxiKtgS.PvIATWOiOdhlgnV.lfwWfQ5GUYMKYQXKHNkJHg12', 1);
insert into users (id, first_name, last_name, email, password, role_id) values (5, 'Darell', 'Hawkings', 'dhawkings4@seesaa.net', '$2a$04$uuaCDFXe3X56EMN5y.itAOQguC5iWwpgaZvZb31AFkI2HWamH671K', 1);
insert into users (id, first_name, last_name, email, password, role_id) values (6, 'Mella', 'Clive', 'mclive5@amazon.de', '$2a$04$4aesnnG6FAowpaurY0p0te8qO11e0PLuyaOVN6MKJomU6G5Wz8B9u', 1);
insert into users (id, first_name, last_name, email, password, role_id) values (7, 'Evonne', 'Moggle', 'emoggle6@theatlantic.com', '$2a$04$vg0LGkM/XE38.u/hNnznzubOavQjtjxp0lFvt297LTglYfGJ0AG.u', 1);
insert into users (id, first_name, last_name, email, password, role_id) values (8, 'Diena', 'Harewood', 'dharewood7@webnode.com', '$2a$04$LSWuv2zuib4OtFaqxZge3ewJF8vjhQH.tg05rQF7QoPEVIPeYOAIq', 1);
insert into users (id, first_name, last_name, email, password, role_id) values (9, 'Elisabet', 'Houndson', 'ehoundson8@hao123.com', '$2a$04$UK/kYe7zg3jjWsx2jUUs0OxM0R5EbY3vZ0o2FxI42SOmnxRLtPVb.', 1);
insert into users (id, first_name, last_name, email, password, role_id) values (10, 'Lev', 'Neat', 'lneat9@elpais.com', '$2a$04$zWV4OorBiYrQWDq.ObIbFeeei.vz2SCL/yqSrAetBT8SM0EcYy4a2', 1);
insert into users (id, first_name, last_name, email, password, role_id) values (11, 'Suzie', 'Giraudot', 'sgiraudota@moonfruit.com', '$2a$04$oLIsklDYhvRgcUNC6m.gcu1FqKt8Fpudr8VQVPo8U4eBrCbdZmFL.', 1);
insert into users (id, first_name, last_name, email, password, role_id) values (12, 'Graham', 'Whitbread', 'gwhitbreadb@blinklist.com', '$2a$04$V8LZ9fv0ifIr2q8EPFVVveBhWez.jyFH5zusjT/uvi.qb8fkwlWim', 1);
insert into users (id, first_name, last_name, email, password, role_id) values (13, 'Goldia', 'Moogan', 'gmooganc@dion.ne.jp', '$2a$04$irZvW1P8skg5vzaFEpwHy.JmcreK7b08kacYo4PJUJPjBU8ISeTUy', 1);
insert into users (id, first_name, last_name, email, password, role_id) values (14, 'Ebenezer', 'Rickard', 'erickardd@i2i.jp', '$2a$04$6x5ZfsG0vQuto8GDVNx0ZuZjf2wYmzKS5AgGYr2nTu/RwOM3lOpcm', 1);
insert into users (id, first_name, last_name, email, password, role_id) values (15, 'Claresta', 'Pooly', 'cpoolye@mtv.com', '$2a$04$EUS4dIqOYXbIwuF9ab/P.upJe0tu1x1yUB/2752IJHAhKyGFj8pBy', 1);

-- datos de servicios
insert into services(id,services_name,description)values(1,"Tatuajes personalizados","Los clientes tendrán la libertad de seleccionar motivos y diseños únicos, personalizando
completamente su experiencia de tatuaje de acuerdo a sus preferencias y gustos.");
insert into services(id,services_name,description)values(2,"Tatuajes del catálogo","Ofrecemos la realización de tatuajes basados en diseños predefinidos en nuestro
catálogo. Los clientes pueden elegir entre una variedad de opciones estilizadas y probadas.");
insert into services(id,services_name,description)values(3,"Restauración y rejuvenecimiento de trabajos:","Nos especializamos en la restauración y rejuvenecimiento de tatuajes existentes. Nuestros
expertos trabajan para mejorar y renovar tatuajes antiguos, devolviéndoles su vitalidad.");
insert into services(id,services_name,description)values(4,"Colocación de piercings y dilatadores","Ofrecemos servicios profesionales para la colocación de piercings y dilatadores. Nuestro
equipo garantiza procedimientos seguros y estilos variados para satisfacer las preferencias individuales
de nuestros clientes.");
insert into services(id,services_name,description)values(5,"Venta de piercings y otros artículos","Además de nuestros servicios de aplicación, ofrecemos una selección de piercings y otros
artículos relacionados con el arte corporal. Los clientes pueden adquirir productos de calidad para
complementar su estilo único.");
