-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 11, 2015 at 05:52 PM
-- Server version: 5.6.26
-- PHP Version: 5.6.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `unionextjs`
--

-- --------------------------------------------------------

--
-- Table structure for table `administrative_resolution`
--

CREATE TABLE IF NOT EXISTS `administrative_resolution` (
  `adminresolutionid` int(11) NOT NULL,
  `adminresolutioncode` varchar(105) DEFAULT NULL,
  `adminresolutiondate` date DEFAULT NULL,
  `adminresolutiontechnical` varchar(155) DEFAULT NULL,
  `adminresolutionlegal` varchar(155) DEFAULT NULL,
  `vehiclequantityid` int(11) NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `administrative_resolution`
--

INSERT INTO `administrative_resolution` (`adminresolutionid`, `adminresolutioncode`, `adminresolutiondate`, `adminresolutiontechnical`, `adminresolutionlegal`, `vehiclequantityid`, `last_update`) VALUES
(1, 'TEMPORAL', '2050-01-01', 'TEMPORAL', 'TEMPORAL', 21, '2015-11-17 14:07:41'),
(2, '15JL152sds', '2015-11-30', '515454874848', '878484848', 7, '2015-11-17 14:07:41');

-- --------------------------------------------------------

--
-- Table structure for table `card_operation`
--

CREATE TABLE IF NOT EXISTS `card_operation` (
  `cardoperationid` int(11) NOT NULL,
  `operatorregisterid` int(11) NOT NULL,
  `vehicleid` int(11) NOT NULL,
  `nameprincipal` varchar(255) DEFAULT NULL,
  `namesecretary` varchar(255) DEFAULT NULL,
  `cardoperationvalidity` date DEFAULT NULL,
  `cardoperationstatus` varchar(45) DEFAULT NULL,
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `cardoperationexpire` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `infraction`
--

CREATE TABLE IF NOT EXISTS `infraction` (
  `infractionid` int(11) NOT NULL,
  `descriptioninfraction` varchar(155) DEFAULT NULL,
  `amountinfraction` varchar(155) DEFAULT NULL,
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `infraction`
--

INSERT INTO `infraction` (`infractionid`, `descriptioninfraction`, `amountinfraction`, `last_update`) VALUES
(1, 'Exceso de Pasajeros', '158', '2015-11-17 14:08:45'),
(2, 'Auto Transformer', '300', '2015-11-17 14:08:45'),
(3, 'sdsdsd', '6262', '2015-12-08 14:28:01'),
(4, '343dfdfdf', '232323', '2015-12-08 14:31:21');

-- --------------------------------------------------------

--
-- Table structure for table `infraction_register`
--

CREATE TABLE IF NOT EXISTS `infraction_register` (
  `infractionregisterid` int(11) NOT NULL,
  `infractionid` int(11) NOT NULL,
  `vehicleid` int(11) NOT NULL,
  `infractionnumberticket` varchar(155) DEFAULT NULL,
  `infractionregisterstate` varchar(45) DEFAULT NULL,
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `infraction_register`
--

INSERT INTO `infraction_register` (`infractionregisterid`, `infractionid`, `vehicleid`, `infractionnumberticket`, `infractionregisterstate`, `last_update`) VALUES
(14, 1, 15, 'dfdfdf', 'Pagado', '2015-12-08 14:21:50');

-- --------------------------------------------------------

--
-- Table structure for table `operator`
--

CREATE TABLE IF NOT EXISTS `operator` (
  `operatorid` int(11) NOT NULL,
  `syndicatename` varchar(195) DEFAULT NULL,
  `operatorcode` varchar(85) DEFAULT NULL,
  `operatorstate` varchar(45) DEFAULT NULL,
  `operatormatrix` varchar(45) DEFAULT NULL,
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `operator`
--

INSERT INTO `operator` (`operatorid`, `syndicatename`, `operatorcode`, `operatorstate`, `operatormatrix`, `last_update`) VALUES
(1, 'TEMPORAL', 'TEMPORAL', 'Valido', 'TEMPORAL', '2015-11-17 14:09:33'),
(2, '16 de Julio', '16JULIO2015', 'Valido', 'Libre', '2015-12-07 20:45:47'),
(3, '16 de diciembre', '14OCT2015s', 'Pendiente', 'Federado', '2015-12-07 20:45:43'),
(6, 'dsds', '23dwsds', 'Valido', 'Libre', '2015-12-08 13:36:48');

--
-- Triggers `operator`
--
DELIMITER $$
CREATE TRIGGER `DeleteOperatorOP` BEFORE DELETE ON `operator`
 FOR EACH ROW DELETE FROM operator_register 
WHERE old.operatorid = operator_register.operatorid
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `operator_register`
--

CREATE TABLE IF NOT EXISTS `operator_register` (
  `operatorregisterid` int(11) NOT NULL,
  `operatorregisterzonestart` varchar(55) DEFAULT NULL,
  `operatorregisterroutestart` varchar(500) DEFAULT NULL,
  `operatorregisterzonefinish` varchar(55) DEFAULT NULL,
  `operatorregisterroutefinish` varchar(500) DEFAULT NULL,
  `operatorregisterstate` varchar(45) DEFAULT NULL,
  `operatorid` int(11) NOT NULL,
  `adminresolutionid` int(11) NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `operator_register`
--

INSERT INTO `operator_register` (`operatorregisterid`, `operatorregisterzonestart`, `operatorregisterroutestart`, `operatorregisterzonefinish`, `operatorregisterroutefinish`, `operatorregisterstate`, `operatorid`, `adminresolutionid`, `last_update`) VALUES
(1, 'TEMPORAL', 'TEMPORAL', 'TEMPORAL', 'TEMPORAL', 'Activo', 1, 1, '2015-11-17 14:10:08'),
(6, 'Zona Sud', 'ddf', 'Zona Valle Alto', 'ddf', 'Pendiente', 7, 2, '2015-11-19 14:02:30'),
(7, 'Zona Valle Alto', 'sdfssd4343', 'Zona Valle Alto', 'd34343', 'Activo', 2, 2, '2015-12-11 16:12:44');

--
-- Triggers `operator_register`
--
DELIMITER $$
CREATE TRIGGER `DeleteProprietorsOPR` BEFORE DELETE ON `operator_register`
 FOR EACH ROW BEGIN
DELETE FROM propietary 
WHERE old.operatorregisterid = propietary.operatorregisterid;

DELETE FROM card_operation 
WHERE old.operatorregisterid = card_operation.operatorregisterid;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `op_register_expand`
--

CREATE TABLE IF NOT EXISTS `op_register_expand` (
  `oprexpandid` int(11) NOT NULL,
  `oprexpandzonestart` varchar(55) DEFAULT NULL,
  `oprexpandroutestart` varchar(500) DEFAULT NULL,
  `oprexpandzonefinish` varchar(55) DEFAULT NULL,
  `oprexpandroutefinish` varchar(500) DEFAULT NULL,
  `adminresolutionid` int(11) NOT NULL,
  `operatorregisterid` int(11) NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `op_register_expand`
--

INSERT INTO `op_register_expand` (`oprexpandid`, `oprexpandzonestart`, `oprexpandroutestart`, `oprexpandzonefinish`, `oprexpandroutefinish`, `adminresolutionid`, `operatorregisterid`, `last_update`) VALUES
(1, 'Zona wtf', 'wtf', 'Zona finish', 'fnish', 2, 1, '2015-12-10 16:28:01'),
(2, 'Zona wtf', 'wtf', 'Zona finish', 'fnish', 1, 1, '2015-12-10 16:28:19');

-- --------------------------------------------------------

--
-- Table structure for table `privileges`
--

CREATE TABLE IF NOT EXISTS `privileges` (
  `privilegesid` int(11) NOT NULL,
  `privilegesdescription` varchar(50) DEFAULT NULL,
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `privileges`
--

INSERT INTO `privileges` (`privilegesid`, `privilegesdescription`, `last_update`) VALUES
(1, 'Super Admin', '2015-11-17 14:17:22'),
(2, 'Administrador', '2015-11-17 14:17:22'),
(3, 'Usuario', '2015-11-17 14:17:22'),
(4, 'Director de Operaciones', '2015-11-17 14:17:22');

-- --------------------------------------------------------

--
-- Table structure for table `propietary`
--

CREATE TABLE IF NOT EXISTS `propietary` (
  `propietaryid` int(11) NOT NULL,
  `propietaryfirstname` varchar(55) DEFAULT NULL,
  `propietarylastname` varchar(55) DEFAULT NULL,
  `propietaryci` varchar(45) DEFAULT NULL,
  `propietaryadress` varchar(155) DEFAULT NULL,
  `propietaryphone` varchar(45) DEFAULT NULL,
  `operatorregisterid` int(11) NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `propietary`
--

INSERT INTO `propietary` (`propietaryid`, `propietaryfirstname`, `propietarylastname`, `propietaryci`, `propietaryadress`, `propietaryphone`, `operatorregisterid`, `last_update`) VALUES
(7, 'guido', 'terceros Fernandez', '515151', 'dfdfd', '515151', 1, '2015-12-07 20:44:38'),
(8, 'dwds', 'dsds', '34343', 'sdsds', '2232', 7, '2015-12-07 16:53:51');

--
-- Triggers `propietary`
--
DELIMITER $$
CREATE TRIGGER `DeleteVehiclesPRO` BEFORE DELETE ON `propietary`
 FOR EACH ROW DELETE FROM vehicle 
WHERE old.propietaryid = vehicle.propietaryid
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Stand-in structure for view `proprietors_by_operator`
--
CREATE TABLE IF NOT EXISTS `proprietors_by_operator` (
`sindicato` varchar(195)
,`propietarios` bigint(21)
);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `userid` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `username` varchar(15) DEFAULT NULL,
  `password` varchar(65) DEFAULT '',
  `phone` varchar(50) DEFAULT NULL,
  `address` varchar(90) DEFAULT NULL,
  `email` varchar(65) DEFAULT NULL,
  `picture` varchar(150) DEFAULT NULL,
  `privilegesid` int(11) NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userid`, `name`, `username`, `password`, `phone`, `address`, `email`, `picture`, `privilegesid`, `last_update`) VALUES
(1, 'SUPERMAN', 'superman', '$Superman123', '70794135', 'Kansas City', 'superman@dc.com', 'superman.jpg', 1, '2015-11-22 04:52:35'),
(9, 'Guido Terceros Fernandez', 'gtf', '$Elmejor123', '70735194', '6 de Agosto 1568', 'guido.terceros@gmail.com', 'logocapitalenationale.png', 2, '2015-11-22 04:51:43'),
(10, 'D7C', 'd7c', '$D7c123', '232323', '323232', 'dev@d7c.com', 'solhydroc_bw.jpg', 3, '2015-11-22 05:04:09');

-- --------------------------------------------------------

--
-- Table structure for table `vehicle`
--

CREATE TABLE IF NOT EXISTS `vehicle` (
  `vehicleid` int(11) NOT NULL,
  `vehiclecapacity` varchar(45) DEFAULT NULL,
  `vehiclecategory` varchar(55) DEFAULT NULL,
  `vehiclechasis` varchar(55) DEFAULT NULL,
  `vehicleclass` varchar(55) DEFAULT NULL,
  `vehiclebrand` varchar(55) DEFAULT NULL,
  `vehiclestatus` varchar(45) DEFAULT NULL,
  `vehiclemodel` varchar(55) DEFAULT NULL,
  `vehiclelicense` varchar(55) DEFAULT NULL,
  `propietaryid` int(11) NOT NULL,
  `picture` varchar(100) DEFAULT NULL,
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vehicle`
--

INSERT INTO `vehicle` (`vehicleid`, `vehiclecapacity`, `vehiclecategory`, `vehiclechasis`, `vehicleclass`, `vehiclebrand`, `vehiclestatus`, `vehiclemodel`, `vehiclelicense`, `propietaryid`, `picture`, `last_update`) VALUES
(15, '6 Personas', 'Pasajeros', 'sdfsd151515', 'Camioneta', 'sdfdfdf', 'NO', '1980', '515151', 7, NULL, '2015-12-08 14:21:38');

--
-- Triggers `vehicle`
--
DELIMITER $$
CREATE TRIGGER `DeleteVehiclesVH` BEFORE DELETE ON `vehicle`
 FOR EACH ROW BEGIN
DELETE FROM infraction_register 
WHERE old.vehicleid = infraction_register.vehicleid;

DELETE FROM card_operation 
WHERE old.vehicleid = card_operation.vehicleid;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `vehicle_quantity`
--

CREATE TABLE IF NOT EXISTS `vehicle_quantity` (
  `vehiclequantityid` int(11) NOT NULL,
  `vehiclequantitydescription` varchar(155) DEFAULT NULL,
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vehicle_quantity`
--

INSERT INTO `vehicle_quantity` (`vehiclequantityid`, `vehiclequantitydescription`, `last_update`) VALUES
(1, '5 Unidades', '2015-11-17 14:17:01'),
(2, '10 Unidades', '2015-11-17 14:17:01'),
(3, '15 Unidades', '2015-11-17 14:17:01'),
(4, '20 Unidades', '2015-11-17 14:17:01'),
(5, '25 Unidades', '2015-11-17 14:17:01'),
(6, '30 Unidades', '2015-11-17 14:17:01'),
(7, '35 Unidades', '2015-11-17 14:17:01'),
(8, '40 Unidades', '2015-11-17 14:17:01'),
(9, '45 Unidades', '2015-11-17 14:17:01'),
(10, '50 Unidades', '2015-11-17 14:17:01'),
(11, '55 Unidades', '2015-11-17 14:17:01'),
(12, '60 Unidades', '2015-11-17 14:17:01'),
(13, '65 Unidades', '2015-11-17 14:17:01'),
(14, '70 Unidades', '2015-11-17 14:17:01'),
(15, '75 Unidades', '2015-11-17 14:17:01'),
(16, '80 Unidades', '2015-11-17 14:17:01'),
(17, '85 Unidades', '2015-11-17 14:17:01'),
(18, '90 Unidades', '2015-11-17 14:17:01'),
(19, '95 Unidades', '2015-11-17 14:17:01'),
(20, '100 Unidades', '2015-11-17 14:17:01'),
(21, '1000 Unidades', '2015-11-17 14:17:01');

-- --------------------------------------------------------

--
-- Structure for view `proprietors_by_operator`
--
DROP TABLE IF EXISTS `proprietors_by_operator`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `proprietors_by_operator` AS select `o`.`syndicatename` AS `sindicato`,count(`p`.`propietaryid`) AS `propietarios` from ((`operator` `o` join `operator_register` `op` on((`o`.`operatorid` = `op`.`operatorid`))) join `propietary` `p` on((`op`.`operatorregisterid` = `p`.`operatorregisterid`))) group by `op`.`operatorregisterid`;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `administrative_resolution`
--
ALTER TABLE `administrative_resolution`
  ADD PRIMARY KEY (`adminresolutionid`);

--
-- Indexes for table `card_operation`
--
ALTER TABLE `card_operation`
  ADD PRIMARY KEY (`cardoperationid`);

--
-- Indexes for table `infraction`
--
ALTER TABLE `infraction`
  ADD PRIMARY KEY (`infractionid`);

--
-- Indexes for table `infraction_register`
--
ALTER TABLE `infraction_register`
  ADD PRIMARY KEY (`infractionregisterid`);

--
-- Indexes for table `operator`
--
ALTER TABLE `operator`
  ADD PRIMARY KEY (`operatorid`);

--
-- Indexes for table `operator_register`
--
ALTER TABLE `operator_register`
  ADD PRIMARY KEY (`operatorregisterid`);

--
-- Indexes for table `op_register_expand`
--
ALTER TABLE `op_register_expand`
  ADD PRIMARY KEY (`oprexpandid`);

--
-- Indexes for table `privileges`
--
ALTER TABLE `privileges`
  ADD PRIMARY KEY (`privilegesid`);

--
-- Indexes for table `propietary`
--
ALTER TABLE `propietary`
  ADD PRIMARY KEY (`propietaryid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userid`);

--
-- Indexes for table `vehicle`
--
ALTER TABLE `vehicle`
  ADD PRIMARY KEY (`vehicleid`);

--
-- Indexes for table `vehicle_quantity`
--
ALTER TABLE `vehicle_quantity`
  ADD PRIMARY KEY (`vehiclequantityid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `administrative_resolution`
--
ALTER TABLE `administrative_resolution`
  MODIFY `adminresolutionid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `card_operation`
--
ALTER TABLE `card_operation`
  MODIFY `cardoperationid` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `infraction`
--
ALTER TABLE `infraction`
  MODIFY `infractionid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `infraction_register`
--
ALTER TABLE `infraction_register`
  MODIFY `infractionregisterid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `operator`
--
ALTER TABLE `operator`
  MODIFY `operatorid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `operator_register`
--
ALTER TABLE `operator_register`
  MODIFY `operatorregisterid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `op_register_expand`
--
ALTER TABLE `op_register_expand`
  MODIFY `oprexpandid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `privileges`
--
ALTER TABLE `privileges`
  MODIFY `privilegesid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `propietary`
--
ALTER TABLE `propietary`
  MODIFY `propietaryid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `vehicle`
--
ALTER TABLE `vehicle`
  MODIFY `vehicleid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `vehicle_quantity`
--
ALTER TABLE `vehicle_quantity`
  MODIFY `vehiclequantityid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=22;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
