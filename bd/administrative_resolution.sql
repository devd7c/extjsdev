-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 07, 2015 at 03:33 PM
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
  `adminresolutiondate` varchar(155) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `administrative_resolution`
--

INSERT INTO `administrative_resolution` (`adminresolutionid`, `adminresolutioncode`, `adminresolutiondate`) VALUES
(3, 'fhghgh', 'Thu Oct 22 2015 00:00:00 GMT-0400 (SA Western Standard Time)');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `administrative_resolution`
--
ALTER TABLE `administrative_resolution`
  ADD PRIMARY KEY (`adminresolutionid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `administrative_resolution`
--
ALTER TABLE `administrative_resolution`
  MODIFY `adminresolutionid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
