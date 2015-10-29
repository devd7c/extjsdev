-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 29, 2015 at 06:41 PM
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
  `vehiclequantityid` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `administrative_resolution`
--

INSERT INTO `administrative_resolution` (`adminresolutionid`, `adminresolutioncode`, `adminresolutiondate`, `adminresolutiontechnical`, `adminresolutionlegal`, `vehiclequantityid`) VALUES
(1, 'TEMPORAL', '2050-01-01', 'TEMPORAL', 'TEMPORAL', 21),
(2, '15JL152sds', '2015-11-30', '515454874848', '878484848', 7);

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
  `cardoperationstatus` varchar(45) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `card_operation`
--

INSERT INTO `card_operation` (`cardoperationid`, `operatorregisterid`, `vehicleid`, `nameprincipal`, `namesecretary`, `cardoperationvalidity`, `cardoperationstatus`) VALUES
(5, 2, 12, 'dfdf', 'dfdfd', '2015-10-07', 'Activo');

-- --------------------------------------------------------

--
-- Table structure for table `infraction`
--

CREATE TABLE IF NOT EXISTS `infraction` (
  `infractionid` int(11) NOT NULL,
  `descriptioninfraction` varchar(155) DEFAULT NULL,
  `amountinfraction` varchar(155) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `infraction`
--

INSERT INTO `infraction` (`infractionid`, `descriptioninfraction`, `amountinfraction`) VALUES
(1, 'Exceso de Pasajeros', '158'),
(2, 'Auto Transformer', '300');

-- --------------------------------------------------------

--
-- Table structure for table `infraction_register`
--

CREATE TABLE IF NOT EXISTS `infraction_register` (
  `infractionregisterid` int(11) NOT NULL,
  `infractionid` int(11) NOT NULL,
  `vehicleid` int(11) NOT NULL,
  `infractionnumberticket` varchar(155) DEFAULT NULL,
  `infractionregisterstate` varchar(45) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `infraction_register`
--

INSERT INTO `infraction_register` (`infractionregisterid`, `infractionid`, `vehicleid`, `infractionnumberticket`, `infractionregisterstate`) VALUES
(1, 2, 10, '5270700dsdsds', 'Pagado'),
(2, 1, 13, '5151451', 'Pagado'),
(3, 2, 14, '12345', 'Cancelado');

-- --------------------------------------------------------

--
-- Table structure for table `operator`
--

CREATE TABLE IF NOT EXISTS `operator` (
  `operatorid` int(11) NOT NULL,
  `syndicatename` varchar(195) DEFAULT NULL,
  `operatorcode` varchar(85) DEFAULT NULL,
  `operatorstate` varchar(45) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `operator`
--

INSERT INTO `operator` (`operatorid`, `syndicatename`, `operatorcode`, `operatorstate`) VALUES
(1, 'TEMPORAL', 'TEMPORAL', 'Valido'),
(2, '16 de Julio', '16JULIO2015', 'Valido'),
(3, '16 de diciembre', '14OCT2015s', 'Valido'),
(7, 'defcom', '234343434', 'Valido');

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
  `adminresolutionid` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `operator_register`
--

INSERT INTO `operator_register` (`operatorregisterid`, `operatorregisterzonestart`, `operatorregisterroutestart`, `operatorregisterzonefinish`, `operatorregisterroutefinish`, `operatorregisterstate`, `operatorid`, `adminresolutionid`) VALUES
(1, 'TEMPORAL', 'TEMPORAL', 'TEMPORAL', 'TEMPORAL', 'Activo', 1, 1),
(2, 'Zona Sud', '515454545', 'Zona Andina', 'dsdsds', 'Activo', 2, 2),
(3, 'Zona Valle Alto', 'ddfdf', 'Cercado', 'dfdfdf', 'Pendiente', 3, 2);

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
  `operatorregisterid` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `propietary`
--

INSERT INTO `propietary` (`propietaryid`, `propietaryfirstname`, `propietarylastname`, `propietaryci`, `propietaryadress`, `propietaryphone`, `operatorregisterid`) VALUES
(1, 'Guido', 'Terceros Fernandez', '5270700', 'Republica 155', '70735194', 1),
(42, 'Ruben', 'Pacheco', '2822525', '6 de Agosto', '51515151', 2);

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
  `picture` varchar(150) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userid`, `name`, `username`, `password`, `phone`, `address`, `email`, `picture`) VALUES
(1, 'Demo', 'demo', 'demo', '70794135', 'Beverly Hills', NULL, NULL);

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
  `picture` varchar(100) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vehicle`
--

INSERT INTO `vehicle` (`vehicleid`, `vehiclecapacity`, `vehiclecategory`, `vehiclechasis`, `vehicleclass`, `vehiclebrand`, `vehiclestatus`, `vehiclemodel`, `vehiclelicense`, `propietaryid`, `picture`) VALUES
(1, '5 Personas', 'Pasajeros', '1234', 'Taxi', 'Suzuki', 'NO', '1980', '358BLG', 42, 'banner.jpg'),
(10, '1 Tonelada', 'Carga', '34343', 'Camion', 'Toyota', 'NO', '1984', '1528JKL', 42, 'solhydroc_bw.jpg'),
(11, '50 Personas', 'Pasajeros', '34343', 'Omnibus', 'Toyota', 'NO', '1989', '1525HJY', 42, 'logo.png'),
(12, '40 Personas', 'Pasajeros', '1234', 'Minibus', 'Nissan', 'SI', '2009', '15254FTG', 42, 'solhydroc_bw.jpg'),
(13, '3 Toneladas', 'Carga', '34343', 'Camioneta', 'Toyota', 'NO', '1984', '2535FRP', 1, 'solhydroc_bw.jpg'),
(14, '6 Personas', 'Pasajeros', 'sfdfdfdfdfd', 'Minibus', 'Suzuky', 'NO', '1983', '515151GHJ', 42, 'solhydroc_bw.jpg'),
(15, '7 Personas', 'Carga', '51515454', 'Omnibus', 'Toyota', 'NO', '1984', '5855141GHT', 1, 'logo_bricollard.png');

-- --------------------------------------------------------

--
-- Table structure for table `vehicle_quantity`
--

CREATE TABLE IF NOT EXISTS `vehicle_quantity` (
  `vehiclequantityid` int(11) NOT NULL,
  `vehiclequantitydescription` varchar(155) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vehicle_quantity`
--

INSERT INTO `vehicle_quantity` (`vehiclequantityid`, `vehiclequantitydescription`) VALUES
(1, '5 Unidades'),
(2, '10 Unidades'),
(3, '15 Unidades'),
(4, '20 Unidades'),
(5, '25 Unidades'),
(6, '30 Unidades'),
(7, '35 Unidades'),
(8, '40 Unidades'),
(9, '45 Unidades'),
(10, '50 Unidades'),
(11, '55 Unidades'),
(12, '60 Unidades'),
(13, '65 Unidades'),
(14, '70 Unidades'),
(15, '75 Unidades'),
(16, '80 Unidades'),
(17, '85 Unidades'),
(18, '90 Unidades'),
(19, '95 Unidades'),
(20, '100 Unidades'),
(21, '1000 Unidades');

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
  MODIFY `cardoperationid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `infraction`
--
ALTER TABLE `infraction`
  MODIFY `infractionid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `infraction_register`
--
ALTER TABLE `infraction_register`
  MODIFY `infractionregisterid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `operator`
--
ALTER TABLE `operator`
  MODIFY `operatorid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `operator_register`
--
ALTER TABLE `operator_register`
  MODIFY `operatorregisterid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `propietary`
--
ALTER TABLE `propietary`
  MODIFY `propietaryid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=43;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
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
