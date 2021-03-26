
SELECT * FROM cat_usuario;
INSERT INTO cat_usuario VALUES
('1', 'Jesus Alberto', 'Martinez', 'Cirilo', 'jesuscirilo', '1234567', '12345', '1', '2019-07-19 00:00:00', '2019-07-19 00:00:00'),
('2', 'Jaime', 'Cirilo', 'Jimenez', 'jaimecirilo', '01', '54321', '1', '2019-07-19 00:00:00', '2019-07-19 00:00:00');

Select * from rol;
INSERT INTO rol VALUES
('1','Super Administrador','1'),
('2','Administrador','1'),
('3', 'Recepcionista', '1');

SELECT * FROM usuario_rol;
INSERT INTO usuario_rol VALUES(UUID_TO_BIN(UUID()),1,1);

SELECT * FROM menu;
INSERT INTO menu VALUES
('1', 'Inicio', '/inicio',0,'',1),
('2', 'Recepcion', '/recepcion',0,'',1),
('3', 'Resultados', '/resultado',0,'',1),
('4', 'Cotizar', '/Cotizar',0,'',1),
('5', 'Examen', '/examen',1,'',1),
('6', 'Administrar', '/administracion',1,'',1);
-- catalogos

SELECT * FROM sub_menu;
INSERT INTO sub_menu VALUES
(1,'Pacientes','/paciente',0,'',1),
(2,'Medicos','/atencion',0,'',1),
(3,'Usuarios','/usuario',0,'',1),
(4,'Roles de usuario','/rol',0,'',1),
(5,'Examen','/examengeneral',0,'',1),
(6,'Categorias','/categoria',0,'',1),
(7,'Secciones','/seccion',0,'',1),
(8,'Metodos','/metodo',0,'',1),
(9,'Clasificacion pacientes','/clasificacion/paciente',0,'',1);

SELECT * FROM menu_sub_menu;
INSERT INTO menu_sub_menu VALUES
(UUID_TO_BIN(UUID()),5,5),
(UUID_TO_BIN(UUID()),5,6),
(UUID_TO_BIN(UUID()),5,7),
(UUID_TO_BIN(UUID()),5,8),
(UUID_TO_BIN(UUID()),5,9),
(UUID_TO_BIN(UUID()),6,1),
(UUID_TO_BIN(UUID()),6,2),
(UUID_TO_BIN(UUID()),6,3),
(UUID_TO_BIN(UUID()),6,4);

SELECT * FROM rol_menu;
INSERT INTO rol_menu VALUES
(UUID_TO_BIN(UUID()),1,1,1,1,1,1),
(UUID_TO_BIN(UUID()),1,2,1,1,1,1),
(UUID_TO_BIN(UUID()),1,3,1,1,1,1),
(UUID_TO_BIN(UUID()),1,4,1,1,1,1),
(UUID_TO_BIN(UUID()),1,5,1,1,1,1),
(UUID_TO_BIN(UUID()),1,6,1,1,1,1);


SELECT * FROM rol_sub_menu;
INSERT INTO rol_sub_menu VALUES
(UUID_TO_BIN(UUID()),1,1,1,1,1,1),
(UUID_TO_BIN(UUID()),1,2,1,1,1,1),
(UUID_TO_BIN(UUID()),1,3,1,1,1,1),
(UUID_TO_BIN(UUID()),1,4,1,1,1,1),
(UUID_TO_BIN(UUID()),1,5,1,1,1,1),
(UUID_TO_BIN(UUID()),1,6,1,1,1,1),
(UUID_TO_BIN(UUID()),1,7,1,1,1,1),
(UUID_TO_BIN(UUID()),1,8,1,1,1,1),
(UUID_TO_BIN(UUID()),1,9,1,1,1,1);

INSERT INTO cat_dias VALUES
(1,"1","Domingo"),
(2,"2","Lunes"),
(3,"3","Martes"),
(4,"4","Miercoles"),
(5,"5","Jueves"),
(6,"6","Viernes"),
(7,"7","Sabado");

SELECT * FROM cat_paciente;
INSERT INTO cat_paciente VALUES
(1, "Melissa Adeli","Martinez","Cirilo","2016-01-26", 0,"cirlo21@outlook.es",1,'9711056913','2019-07-19 00:00:00', '2019-07-19 00:00:00'),
(2, "Karen Dennis","Martinez","Cirilo","2000-10-16", 0,"cirlo492@gmail.com",1,'9711056913','2019-07-19 00:00:00', '2019-07-19 00:00:00');


SELECT * FROM cat_medico;
INSERT INTO cat_medico VALUES
('1','A','Q','C','1',NOW(),NOW());

SELECT * FROM cat_categoria;
INSERT INTO cat_categoria VALUES
('1', 'Hematologia', '1', '1',NOW(),NOW()),
('2', 'Uruanalisis', '2', '1',NOW(),NOW()),
('3', 'Función Hepatica', '3', '1',NOW(),NOW()),
('4', 'Función Cardiaca', '4', '1',NOW(),NOW()),
('5', 'Enfermedades Reumaticas', '5', '1',NOW(),NOW()),
('6', 'Electrolitos', '6', '1',NOW(),NOW()),
('7', 'Anemias Carenciales', '7', '1',NOW(),NOW()),
('8', 'Microbiologia', '8', '1',NOW(),NOW()),
('9', 'Marcadores Tumorales', '9', '1',NOW(),NOW()),
('10', 'Quimica Sanguinea', '10', '1',NOW(),NOW()),
('11', 'Parasitologia', '11', '1',NOW(),NOW()),
('12', 'Funcion Pancreatica', '12', '1',NOW(),NOW()),
('13', 'Enfermedades Autoinmunes', '13', '1',NOW(),NOW()),
('14', 'Infectologia', '14', '1',NOW(),NOW()),
('15', 'Endocrinologia', '15', '1',NOW(),NOW()),
('16', 'Diversos', '16', '1',NOW(),NOW());

SELECT * FROM cat_metodo;
INSERT INTO cat_metodo VALUES
(1,'Impedancia','1',NOW(),NOW()),
(2,'Automatizado','1',NOW(),NOW()),
(3,'Quimica seca','1',NOW(),NOW()),
(4,'Espectrofotometria','1',NOW(),NOW()),
(5,'Espectrofotometria por reflactancia','1',NOW(),NOW()),
(6,'Acs Monoclonales','1',NOW(),NOW()),
(7,'Ion selectivo/Quimica seca','1',NOW(),NOW()),
(8,'Inmunoturbidimetria','1',NOW(),NOW()),
(9,'Wintrobe/Inmunoturbidimetria','1',NOW(),NOW()),
(10,'Concentracion Minima Inhibitoria','1',NOW(),NOW());

SELECT * FROM examen_general;
INSERT INTO 
    examen_general (examen_id, nombre, alias, titulo_examen,estado, precio, clave, categoria_id, fecha_creacion, fecha_actualizacion) 
VALUES
(1, 'Citometria Hematica Completa','','',1,100.0,'',1,now(),now()),
(2, 'Velocidad de Sedimentacion Eritrocitaria(VSG)','','',1,100.0,'',1,now(),now()),
(3, 'Plaquetas','','',1,100.0,'',1,now(),now()),
(4, 'Tiempos de Coagulación(TP,INR,TTPa,TC,TS)','','',1,100.0,'',1,now(),now()),
(5, 'Tiempo de Protrombina (TP,INR)','','',1,100.0,'',1,now(),now()),
(6, 'Tiempo de troboplastina Pacial (TTPa)','','',1,100.0,'',1,now(),now()),
(7, 'Tiempo de Sangrado (TS)','','',1,100.0,'',1,now(),now()),
(8, 'Tiempo de Coagulación','','',1,100.0,'',1,now(),now()),
(9, 'Reticulocitos','','',1,100.0,'',1,now(),now()),
(10, 'Grupo Sanguíneo y Factor RH','','',1,100.0,'',1,now(),now()),
(11, 'Examen General de Orina','','',1,100.0,'',2,now(),now()),
(12, 'Microalbuminuria','','',1,100.0,'',2,now(),now()),
(13, 'Proteinas en Orina 24 hrs','','',1,100.0,'',2,now(),now()),
(14, 'Depuración de Creatinina en orina de 24 hrs','','',1,100.0,'',2,now(),now()),
(15, 'Prueba de Embarazo','','',1,100.0,'',2,now(),now()),
(16, 'Bilirrubinas Sericas (BT, BD, BI)','','',1,100.0,'',3,now(),now()),
(17, 'Transaminasas (TGO, TGP)','','',1,100.0,'',3,now(),now()),
(18, 'Fosfatasa Alcalina (ALP)','','',1,100.0,'',3,now(),now()),
(19, 'Gamaglutamitranspeptidasa (GGT)','','',1,100.0,'',3,now(),now()),
(20, 'Pruebas del Funcionamiento Hepático (PFH)','','',1,100.0,'',3,now(),now()),
(21, '(BD, BT, BI,TRANSAMINASAS,FALC,DHL,PT,ALB,TP,INR)','','',1,100.0,'',3,now(),now()),
(22, 'Creatincinasa (CK)','','',1,100.0,'',4,now(),now()),
(23, 'Troponina I','','',1,100.0,'',4,now(),now()),
(24, 'DHL','','',1,100.0,'',4,now(),now()),
(25, 'CK-MB','','',1,100.0,'',4,now(),now()),
(26, 'TGO','','',1,100.0,'',4,now(),now()),
(27, 'Perfil Reumatico (ASO,PCR,FR, VSG, Ac Urico)','','',1,100.0,'',5,now(),now()),
(28, 'Proteina C Reactiva','','',1,100.0,'',5,now(),now()),
(29, 'Factor Reumatoide','','',1,100.0,'',5,now(),now()),
(30, 'Antiestreptolisinas','','',1,100.0,'',5,now(),now()),
(31, 'Calcio Serico','','',1,100.0,'',5,now(),now()),
(32, 'Sodio','','',1,100.0,'',6,now(),now()),
(33, 'Potasio','','',1,100.0,'',6,now(),now()),
(34, 'Cloro','','',1,100.0,'',6,now(),now()),
(35, 'Calcio','','',1,100.0,'',6,now(),now()),
(36, 'Fosforo','','',1,100.0,'',6,now(),now()),
(37, 'Magnesio','','',1,100.0,'',6,now(),now()),
(38, 'Hierro Serico','','',1,100.0,'',7,now(),now()),
(39, 'Ferritina','','',1,100.0,'',7,now(),now()),
(40, 'Acido Folico','','',1,100.0,'',7,now(),now()),
(41, 'Perfil de Anemias (Hierro sérico, capacidad Total de Fijación de Hierro, Transferrina)','','',1,100.0,'',7,now(),now()),
(42, 'Vitamina B12','','',1,100.0,'',7,now(),now()),
(43, 'Transferrina','','',1,100.0,'',7,now(),now()),
(44, 'Cultivo Faringeo','','',1,100.0,'',8,now(),now()),
(45, 'Cultivo Vaginal','','',1,100.0,'',8,now(),now()),
(46, 'Cultivo Uretral','','',1,100.0,'',8,now(),now()),
(47, 'BAAR EN SPUTO (1,2,3)','','',1,100.0,'',8,now(),now()),
(48, 'Urocultivo','','',1,100.0,'',8,now(),now()),
(49, 'Cultivo de Heridas','','',1,100.0,'',8,now(),now()),
(50, 'Antibiograma','','',1,100.0,'',8,now(),now()),
(51, 'Antigeno Prostático Especifico (t-PSA)','','',1,100.0,'',9,now(),now()),
(52, 'Perfil Prostático (t-PSA, PSA-Libre, IR)','','',1,100.0,'',9,now(),now()),
(53, 'ACE','','',1,100.0,'',9,now(),now()),
(54, 'CA-125(ovario)','','',1,100.0,'',9,now(),now()),
(55, 'CA-19-9(Páncreas)','','',1,100.0,'',9,now(),now()),
(56, 'ALFAFETOPROTEINA','','',1,100.0,'',9,now(),now()),
(57, 'CA-15-3(mamá)','','',1,100.0,'',9,now(),now()),
(58, 'Glucosa Basal','','',1,100.0,'',10,now(),now()),
(59, 'Glucosa postrandial (2 horaas)','','',1,100.0,'',10,now(),now()),
(60, 'Curva de tolerancia a la glucosa(50g,75g,100g) (1 hr, 2hrs, 3hrs)','','',1,100.0,'',10,now(),now()),
(61, 'QUÍMICA SANGUÍNEA I','','',1,100.0,'',10,now(),now()),
(62, 'QUIMICA SANGUINEA II','','',1,100.0,'',10,now(),now()),
(63, 'QUÍMICA SANGUÍNEA III','','',1,100.0,'',10,now(),now()),
(64, 'Perfil de Lipídos','','',1,100.0,'',10,now(),now()),
(65, 'Lipidos Totales','','',1,100.0,'',10,now(),now()),
(66, 'Colesterol HDL','','',1,100.0,'',10,now(),now()),
(67, 'Colesterol LDL','','',1,100.0,'',10,now(),now()),
(68, 'Colesterol VLDL','','',1,100.0,'',10,now(),now()),
(69, 'Colesterol Total','','',1,100.0,'',10,now(),now()),
(70, 'Trigliceridos','','',1,100.0,'',10,now(),now()),
(71, 'Ac. Urico','','',1,100.0,'',10,now(),now()),
(72, 'Proteinas Totales','','',1,100.0,'',10,now(),now()),
(73, 'Albúmina','','',1,100.0,'',10,now(),now()),
(74, 'Globulina','','',1,100.0,'',10,now(),now()),
(75, 'Relacion A/G','','',1,100.0,'',10,now(),now()),
(76, 'Coproparasitoscopico (1,2,3)','','',1,100.0,'',11,now(),now()),
(77, 'Corpologico completo','','',1,100.0,'',11,now(),now()),
(78, 'Amiba en fresco','','',1,100.0,'',11,now(),now()),
(79, 'Sangre Oculta en heces','','',1,100.0,'',11,now(),now()),
(80, 'Rotavirus/Adenovirus','','',1,100.0,'',11,now(),now()),
(81, 'Leucocitos en moco focal','','',1,100.0,'',11,now(),now()),
(82, 'ph','','',1,100.0,'',11,now(),now()),
(83, 'Azucares Reductores en heces','','',1,100.0,'',11,now(),now()),
(84, 'Tolerancia a la glucosa (50g, 75, 100g) (1hr, 2hrs, 3hrs)','','',1,100.0,'',12,now(),now()),
(85, 'Hemoglobina Glicosilada (HbA Ic)','','',1,100.0,'',12,now(),now()),
(86, 'Amilasa','','',1,100.0,'',12,now(),now()),
(87, 'Lipasa','','',1,100.0,'',12,now(),now()),
(88, 'Insulina','','',1,100.0,'',12,now(),now()),
(89, 'Peptido C','','',1,100.0,'',12,now(),now()),
(90, 'IgG Sérica','','',1,100.0,'',13,now(),now()),
(91, 'IgA Sérica','','',1,100.0,'',13,now(),now()),
(92, 'IgM Sérica','','',1,100.0,'',13,now(),now()),
(93, 'IgE Sérica','','',1,100.0,'',13,now(),now()),
(94, 'Ac. Anti-Hepatitis A (HAVA)','','',1,100.0,'',14,now(),now()),
(95, 'Ag. Anti-Hepatitis B (HBsAg)','','',1,100.0,'',14,now(),now()),
(96, 'Ac. Anti-Hepatitis C (HCV)','','',1,100.0,'',14,now(),now()),
(97, 'Ac. Anti-Chlamydia (IgG, Igm)','','',1,100.0,'',14,now(),now()),
(98, 'Ac. Anti-Dengue DUO(IgG,IgM)','','',1,100.0,'',14,now(),now()),
(99, 'Ac. Anti-Helicobacter Pylori (IgG)','','',1,100.0,'',14,now(),now()),
(100, 'Reacciones Febriles','','',1,100.0,'',14,now(),now()),
(101, 'Ac. Anti-Chikungunya IgM','','',1,100.0,'',14,now(),now()),
(102, 'Ac. Anti-Cisticerco IgG','','',1,100.0,'',14,now(),now()),
(103, 'Ac. Anti-Citomegalovirus IgG','','',1,100.0,'',14,now(),now()),
(104, '	Ac. Anti-Citomegalovirus IgM','','',1,100.0,'',14,now(),now()),
(105, 'Ac. Anti-Toxoplasma IgG','','',1,100.0,'',14,now(),now()),
(106, 'Ac. Anti-Toxoplasma IgM','','',1,100.0,'',14,now(),now()),
(107, 'V.D.R.L','','',1,100.0,'',14,now(),now()),
(108, 'Ac. Anti-VIH','','',1,100.0,'',14,now(),now()),
(109, 'Ac. Anti-VIH-1 (W,BLOT CONFIRMATORIO)','','',1,100.0,'',14,now(),now()),
(110, 'Ac. Anti-VIH-2 (W,BLOT CONFIRMATORIO)','','',1,100.0,'',14,now(),now()),
(111, 'Perfil TORCH IgM (Texoplasma, Rubeola, CMV, Herpes 1, Herpes 2)','','',1,100.0,'',14,now(),now()),
(112, 'Perfil TORCH IgG (Texoplasma, Rubeola, CMV, Herpes 1, Herpes 2)','','',1,100.0,'',14,now(),now()),
(113, 'Prueba de embarazo (Cualitativa)','','',1,100.0,'',15,now(),now()),
(114, 'HCG (Cuantitativa) (Fraccion Beta)','','',1,100.0,'',15,now(),now()),
(115, 'Prolactina','','',1,100.0,'',15,now(),now()),
(116, 'Progesterona','','',1,100.0,'',15,now(),now()),
(117, 'Perfil Titoideo (TC,T3T,T4TYP,ITL,TSH)','','',1,100.0,'',15,now(),now()),
(118, 'Perfil Tiroideo VI (T3 Libre, T4 Libre, TSH)','','',1,100.0,'',15,now(),now()),
(119, 'Perfil Tiroideo VII (T3 Total, T4 Total, TSH)','','',1,100.0,'',15,now(),now()),
(120, 'Perfil Ginecologico','','',1,100.0,'',15,now(),now()),
(121, 'Perfil Hormonal Femenino (Perfil Ginecologico 1, Perfil Tiroideo)','','',1,100.0,'',15,now(),now()),
(122, 'Espermatobioscopia Directa','','',1,100.0,'',16,now(),now()),
(123, 'Perfilo de Drogas','','',1,100.0,'',16,now(),now()),
(124, 'Cannabinoídes','','',1,100.0,'',16,now(),now()),
(125, 'Cocaina','','',1,100.0,'',16,now(),now()),
(126, 'Benzodiacepinas','','',1,100.0,'',16,now(),now()),
(127, 'Anfetaminas','','',1,100.0,'',16,now(),now()),
(128, 'M-Anfetaminas','','',1,100.0,'',16,now(),now()),
(129, 'Morfina','','',1,100.0,'',16,now(),now());


SELECT * FROM cat_paquete;
INSERT INTO cat_paquete VALUES
(1,"Paquete 1","Descuento por aniversario Nro: 75","2020-09-07 23:59:00","2020-09-07 23:59:00","1234567",'500',50,123.50,1,now(),now()),
(2,"Paquete 2","Descuento por buen fin","2020-09-07 23:59:00","2020-12-30 23:59:00","123",'500',50,150.00,1,now(),now()),
(3,"Paquete 3","Descripcion paquete 2","2020-09-07 23:59:00","2020-12-30 23:59:00","1234567",'600',50,150.00,1,now(),now()),
(4,"Paquete 4","La descripcion paquete 4","2020-09-07 23:59:00","2020-12-30 23:59:00","1234567",'350',50,150.00,1,now(),now()),
(5,"Paquete 5","Descripcion paquete 5","2020-09-07 23:59:00","2020-12-30 23:59:00","1234567",'350',50,150.00,1,now(),now()),
(6,"Paquete 6","Descripcion paquete 5","2020-09-07 23:59:00","2020-12-30 23:59:00","1234567",'350',50,150.00,1,now(),now()),
(7,"Paquete 7","Descripcion paquete 5","2020-09-07 23:59:00","2020-12-30 23:59:00","1234567",'350',50,150.00,1,now(),now());

INSERT INTO cat_clasificacion_paciente VALUES 
(1,"Sin clasificacion","0","100",1,now(),now()),
(2,"Todas las edades","0","100",1,now(),now()),
(3,"Niños de 0 a 1 año","0","1",1,now(),now()),
(4,"Niños de 1 año a 4 años","1","4",1,now(),now()),
(5,"Niños de 5 años a 9 años","5","9",1,now(),now()),
(6,"Adolecente","10","20",1,now(),now()),
(7,"Adulto","20","50",1,now(),now()),
(8,"Adultos mayores","50","100",1,now(),now()),
(9,"Mascota canina","1","20",1,now(),now());




DROP DATABASE laboratorio;

USE laboratorio;
SELECT * FROM cotizacion;
INSERT INTO cotizacion VALUES("020820200004","2020-09-03","22:34:24");
SELECT * FROM examen_general_cotizacion;
INSERT INTO examen_general_cotizacion VALUES(1,"020820200004");

SELECT * FROM cat_descuento;

INSERT INTO cat_descuento VALUES(1,"Hot Sale","40",150.50,1);
INSERT INTO cat_descuento VALUES(2,"Black day","40",100.00,1);

SELECT * FROM examen_general_descuento;
INSERT INTO examen_general_descuento VALUES(2,1);

SELECT * FROM dia_descuento;
-- format datetime YYYY-MM-DD hh:mm:ss
INSERT INTO dia_descuento VALUES
(1,1,"2020-09-07 23:59:00","2020-10-08 23:59:00"),
(2,2,"2020-09-07 23:59:00","2020-10-08 23:59:00"),
(3,1,"2020-09-07 23:59:00","2020-10-08 23:59:00"),
(4,1,"2020-09-07 23:59:00","2020-10-08 23:59:00"),
(5,1,"2020-09-07 23:59:00","2020-10-08 23:59:00"),
(6,1,"2020-09-07 23:59:00","2020-10-08 23:59:00"),
(7,1,"2020-09-07 23:59:00","2020-10-08 23:59:00");


SELECT * FROM cat_paquete;
INSERT INTO cat_paquete VALUES
(1,"Paquete 1","Descuento por aniversario Nro: 75","2020-09-07 23:59:00","2020-09-07 23:59:00","123",'500',50,123.50,1),
(2,"Paquete 2","Descuento por buen fin","2020-09-07 23:59:00","2020-09-07 23:59:00","123",'500',50,150.00,1),
(3,"Paquete 3","Descripcion paquete 2","2020-09-07 23:59:00","2020-12-30 23:59:00","1234567",'600',50,150.00,1),
(4,"Paquete 4","La descripcion paquete 4","2020-09-07 23:59:00","2020-12-30 23:59:00","1234567",'350',50,150.00,1),
(5,"Paquete 5","Descripcion paquete 5","2020-09-07 23:59:00","2020-12-30 23:59:00","1234567",'350',50,150.00,1),
(6,"Paquete 6","Descripcion paquete 5","2020-09-07 23:59:00","2020-12-30 23:59:00","1234567",'350',50,150.00,1),
(7,"Paquete 7","Descripcion paquete 5","2020-09-07 23:59:00","2020-12-30 23:59:00","1234567",'350',50,150.00,1);

SELECT * FROM cat_paquete_examen;
INSERT INTO cat_paquete_examen VALUES
(5,1),
(5,2),
(5,3);



SELECT * FROM cat_estudio;
INSERT INTO cat_estudio VALUES("1","Glucosa",1);
SELECT * FROM cat_clasificacion_paciente;


SELECT * FROM estudio;
INSERT INTO referencia VALUES
(1,1,"REF hombre","Ref mujer",""),
(2,1,"Ref nino","Ref nina","");



SELECT * FROM rol;
SELECT * FROM cat_usuario;
SELECT * FROM usuario_rol;

INSERT INTO usuario_rol values(1,4);


SELECT * FROM cat_medico;
DESC cat_medico;


SELECT * FROM cat_seccion;

DESC recepcion;


SELECT * FROM examen_general;

-- ########################
USE laboratorio;

SELECT * FROM estudio_examen_general;

SELECT * FROM cat_estudio;



INSERT INTO cat_estudio VALUES(1,'Glucosa',1,now(),now());


SELECT * FROM cat_seccion;
INSERT INTO cat_seccion VALUES
(1,'PRUEBAS DE FUNCIONAMIENTO HEPATICO','PRUEBAS DEL FUNCIONAMIENTO HEPATICO',1,NOW(),NOW()),
(2,'T.P,INR','',1,NOW(),NOW()),
(3,'PANEL DE HEPATITIS','PANEL DE HEPATITIS',1,NOW(),NOW());


SELECT * FROM seccion_examen_general;
INSERT INTO seccion_examen_general VALUES(UUID_TO_BIN(UUID()),1,20,1),(UUID_TO_BIN(UUID()),2,20,2),(UUID_TO_BIN(UUID()),3,20,3);

SELECT * FROM estudio_seccion;
INSERT INTO metodo_seccion VALUES(UUID_TO_BIN(UUID()),3,1),(UUID_TO_BIN(UUID()),2,2),(UUID_TO_BIN(UUID()),4,3);


SELECT * FROM cat_metodo;


SELECT * FROM cat_estudio ce ;

INSERT INTO cat_estudio VALUES
(2,'B. Directa',1,NOW(),NOW()),
(3,'B. Total',1,NOW(),NOW()),
(4,'B. Indirecta',1,NOW(),NOW()),
(5,'T G O (AST)',1,NOW(),NOW()),
(6,'T G P (ALT)',1,NOW(),NOW()),
(7,'GGT',1,NOW(),NOW()),
(8,'F. ALCALINA (ALP)',1,NOW(),NOW()),
(9,'Proteinas Totales',1,NOW(),NOW()),
(10,'Albumina',1,NOW(),NOW()),
(11,'Globulina',1,NOW(),NOW()),
(12,'Relacion A/G',1,NOW(),NOW()),
(13,'T.P',1,NOW(),NOW()),
(14,'INR',1,NOW(),NOW()),
(15,'Ac. Anti-Hepatitis A(HAVA) IgG',1,NOW(),NOW()),
(16,'Ac. Anti-Hepatitis A(HAVA) IgM',1,NOW(),NOW()),
(17,'Ac. Anti-Hepatitis B(HBsAg)',1,NOW(),NOW()),
(18,'Ac. Anti-Hepatitis C(HCV)',1,NOW(),NOW());

SELECT * FROM cat_clasificacion_paciente;
INSERT INTO cat_clasificacion_paciente VALUES(1,'Todas las edades','25','36',1,NOW(),NOW());
INSERT INTO cat_clasificacion_paciente VALUES(2,'Mascota','1','10',1,NOW(),NOW());


SELECT * FROM referencia;
INSERT INTO referencia VALUES(UUID_TO_BIN(UUID()),1,2,'','','0,10-0,40 mg/dl', NOW(),NOW());

INSERT INTO referencia VALUES(UUID_TO_BIN(UUID()),1,3,'','','0,10-0,20 mg/dl', NOW(),NOW());




SELECT * FROM estudio_seccion es ;
INSERT INTO estudio_seccion VALUES
(UUID_TO_BIN(UUID()),2,1,1),
(UUID_TO_BIN(UUID()),3,1,2),
(UUID_TO_BIN(UUID()),4,1,3),
(UUID_TO_BIN(UUID()),5,1,4),
(UUID_TO_BIN(UUID()),6,1,5),
(UUID_TO_BIN(UUID()),7,1,6),
(UUID_TO_BIN(UUID()),8,1,7),
(UUID_TO_BIN(UUID()),9,1,8),
(UUID_TO_BIN(UUID()),10,1,9),
(UUID_TO_BIN(UUID()),11,1,10),
(UUID_TO_BIN(UUID()),12,1,11),
(UUID_TO_BIN(UUID()),13,2,1),
(UUID_TO_BIN(UUID()),14,2,2),
(UUID_TO_BIN(UUID()),15,3,1),
(UUID_TO_BIN(UUID()),16,3,2),
(UUID_TO_BIN(UUID()),17,3,3),
(UUID_TO_BIN(UUID()),18,3,4);




SELECT * FROM sub_menu sm;
SELECT * FROM rol_sub_menu;


INSERT INTO menu_sub_menu VALUES (UUID_TO_BIN(UUID()),6,8);

INSERT INTO rol_sub_menu VALUES(UUID_TO_BIN(UUID()),1,8,1,1,1,1);

SELECT * FROM examen_general;
 SELECT * FROM estudio_examen_general;
 
 INSERT INTO estudio_examen_general VALUES(UUID_TO_BIN(UUID()),19,20);