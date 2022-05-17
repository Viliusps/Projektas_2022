-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 17, 2022 at 07:25 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inzinerija2`
--

-- --------------------------------------------------------

--
-- Table structure for table `amounts`
--

CREATE TABLE `amounts` (
  `Id` int(11) NOT NULL,
  `Amount` double NOT NULL,
  `Staking_amount` double NOT NULL,
  `When_staked` date NOT NULL,
  `fk_crypto` int(11) NOT NULL,
  `fk_portfolio` int(11) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `amounts`
--

INSERT INTO `amounts` (`Id`, `Amount`, `Staking_amount`, `When_staked`, `fk_crypto`, `fk_portfolio`, `createdAt`, `updatedAt`) VALUES
(1, 50, 0, '2022-05-17', 3, 4, '0000-00-00', '0000-00-00'),
(2, 100, 0, '2022-05-17', 2, 1, '0000-00-00', '0000-00-00'),
(12, 0, 0, '0000-00-00', 6, 5, '2022-05-17', '2022-05-17'),
(13, 0, 0, '0000-00-00', 6, 6, '2022-05-17', '2022-05-17'),
(14, 0, 0, '0000-00-00', 6, 7, '2022-05-17', '2022-05-17'),
(71, 0, 0, '0000-00-00', 1, 9, '2022-05-17', '2022-05-17'),
(72, 1.21, 1, '2021-05-11', 2, 9, '2022-05-17', '2022-05-17'),
(73, 0, 0, '0000-00-00', 3, 9, '2022-05-17', '2022-05-17'),
(74, 0, 0, '0000-00-00', 4, 9, '2022-05-17', '2022-05-17'),
(75, 0, 0, '0000-00-00', 5, 9, '2022-05-17', '2022-05-17'),
(76, 10001, 0, '0000-00-00', 6, 9, '2022-05-17', '2022-05-17'),
(77, 0, 0, '0000-00-00', 7, 9, '2022-05-17', '2022-05-17'),
(78, 0, 0, '0000-00-00', 8, 9, '2022-05-17', '2022-05-17'),
(79, 0, 0, '0000-00-00', 9, 9, '2022-05-17', '2022-05-17'),
(80, 0, 0, '0000-00-00', 10, 9, '2022-05-17', '2022-05-17'),
(81, 0, 0, '0000-00-00', 11, 9, '2022-05-17', '2022-05-17'),
(82, 0, 0, '0000-00-00', 12, 9, '2022-05-17', '2022-05-17'),
(83, 0, 0, '0000-00-00', 13, 9, '2022-05-17', '2022-05-17'),
(84, 0, 0, '0000-00-00', 14, 9, '2022-05-17', '2022-05-17'),
(85, 0, 0, '0000-00-00', 15, 9, '2022-05-17', '2022-05-17'),
(86, 0, 0, '0000-00-00', 16, 9, '2022-05-17', '2022-05-17'),
(87, 0, 0, '0000-00-00', 17, 9, '2022-05-17', '2022-05-17'),
(88, 0, 0, '0000-00-00', 18, 9, '2022-05-17', '2022-05-17'),
(89, 0, 0, '0000-00-00', 19, 9, '2022-05-17', '2022-05-17'),
(90, 0, 0, '0000-00-00', 20, 9, '2022-05-17', '2022-05-17'),
(91, 0, 0, '0000-00-00', 21, 9, '2022-05-17', '2022-05-17'),
(92, 0, 0, '0000-00-00', 22, 9, '2022-05-17', '2022-05-17'),
(93, 0, 0, '0000-00-00', 23, 9, '2022-05-17', '2022-05-17'),
(94, 0, 0, '0000-00-00', 24, 9, '2022-05-17', '2022-05-17'),
(95, 0, 0, '0000-00-00', 25, 9, '2022-05-17', '2022-05-17'),
(96, 0, 0, '0000-00-00', 26, 9, '2022-05-17', '2022-05-17'),
(97, 0, 0, '0000-00-00', 27, 9, '2022-05-17', '2022-05-17'),
(98, 0, 0, '0000-00-00', 28, 9, '2022-05-17', '2022-05-17'),
(99, 0, 0, '0000-00-00', 29, 9, '2022-05-17', '2022-05-17'),
(100, 0, 0, '0000-00-00', 30, 9, '2022-05-17', '2022-05-17'),
(101, 0, 0, '0000-00-00', 31, 9, '2022-05-17', '2022-05-17'),
(102, 0, 0, '0000-00-00', 32, 9, '2022-05-17', '2022-05-17'),
(103, 0, 0, '0000-00-00', 33, 9, '2022-05-17', '2022-05-17'),
(104, 0, 0, '0000-00-00', 34, 9, '2022-05-17', '2022-05-17'),
(105, 0, 0, '0000-00-00', 35, 9, '2022-05-17', '2022-05-17'),
(106, 0, 0, '0000-00-00', 36, 9, '2022-05-17', '2022-05-17'),
(107, 0, 0, '0000-00-00', 37, 9, '2022-05-17', '2022-05-17'),
(108, 0, 0, '0000-00-00', 38, 9, '2022-05-17', '2022-05-17'),
(109, 0, 0, '0000-00-00', 39, 9, '2022-05-17', '2022-05-17'),
(110, 0, 0, '0000-00-00', 40, 9, '2022-05-17', '2022-05-17'),
(111, 0, 0, '0000-00-00', 41, 9, '2022-05-17', '2022-05-17'),
(112, 0, 0, '0000-00-00', 42, 9, '2022-05-17', '2022-05-17'),
(113, 0, 0, '0000-00-00', 43, 9, '2022-05-17', '2022-05-17'),
(114, 0, 0, '0000-00-00', 44, 9, '2022-05-17', '2022-05-17'),
(115, 0, 0, '0000-00-00', 45, 9, '2022-05-17', '2022-05-17'),
(116, 0, 0, '0000-00-00', 46, 9, '2022-05-17', '2022-05-17'),
(117, 0, 0, '0000-00-00', 47, 9, '2022-05-17', '2022-05-17'),
(118, 0, 0, '0000-00-00', 48, 9, '2022-05-17', '2022-05-17'),
(119, 0, 0, '0000-00-00', 49, 9, '2022-05-17', '2022-05-17'),
(120, 0, 0, '0000-00-00', 50, 9, '2022-05-17', '2022-05-17'),
(121, 0, 0, '0000-00-00', 51, 9, '2022-05-17', '2022-05-17'),
(122, 0, 0, '0000-00-00', 1, 10, '2022-05-17', '2022-05-17'),
(123, 0, 0, '0000-00-00', 2, 10, '2022-05-17', '2022-05-17'),
(124, 0, 0, '0000-00-00', 3, 10, '2022-05-17', '2022-05-17'),
(125, 0, 0, '0000-00-00', 4, 10, '2022-05-17', '2022-05-17'),
(126, 0, 0, '0000-00-00', 5, 10, '2022-05-17', '2022-05-17'),
(127, 0, 0, '0000-00-00', 6, 10, '2022-05-17', '2022-05-17'),
(128, 0, 0, '0000-00-00', 7, 10, '2022-05-17', '2022-05-17'),
(129, 0, 0, '0000-00-00', 8, 10, '2022-05-17', '2022-05-17'),
(130, 0, 0, '0000-00-00', 9, 10, '2022-05-17', '2022-05-17'),
(131, 0, 0, '0000-00-00', 10, 10, '2022-05-17', '2022-05-17'),
(132, 0, 0, '0000-00-00', 11, 10, '2022-05-17', '2022-05-17'),
(133, 0, 0, '0000-00-00', 12, 10, '2022-05-17', '2022-05-17'),
(134, 0, 0, '0000-00-00', 13, 10, '2022-05-17', '2022-05-17'),
(135, 0, 0, '0000-00-00', 14, 10, '2022-05-17', '2022-05-17'),
(136, 0, 0, '0000-00-00', 15, 10, '2022-05-17', '2022-05-17'),
(137, 0, 0, '0000-00-00', 16, 10, '2022-05-17', '2022-05-17'),
(138, 0, 0, '0000-00-00', 17, 10, '2022-05-17', '2022-05-17'),
(139, 0, 0, '0000-00-00', 18, 10, '2022-05-17', '2022-05-17'),
(140, 0, 0, '0000-00-00', 19, 10, '2022-05-17', '2022-05-17'),
(141, 0, 0, '0000-00-00', 20, 10, '2022-05-17', '2022-05-17'),
(142, 0, 0, '0000-00-00', 21, 10, '2022-05-17', '2022-05-17'),
(143, 0, 0, '0000-00-00', 22, 10, '2022-05-17', '2022-05-17'),
(144, 0, 0, '0000-00-00', 23, 10, '2022-05-17', '2022-05-17'),
(145, 0, 0, '0000-00-00', 24, 10, '2022-05-17', '2022-05-17'),
(146, 0, 0, '0000-00-00', 25, 10, '2022-05-17', '2022-05-17'),
(147, 0, 0, '0000-00-00', 26, 10, '2022-05-17', '2022-05-17'),
(148, 0, 0, '0000-00-00', 27, 10, '2022-05-17', '2022-05-17'),
(149, 0, 0, '0000-00-00', 28, 10, '2022-05-17', '2022-05-17'),
(150, 0, 0, '0000-00-00', 29, 10, '2022-05-17', '2022-05-17'),
(151, 0, 0, '0000-00-00', 30, 10, '2022-05-17', '2022-05-17'),
(152, 0, 0, '0000-00-00', 31, 10, '2022-05-17', '2022-05-17'),
(153, 0, 0, '0000-00-00', 32, 10, '2022-05-17', '2022-05-17'),
(154, 0, 0, '0000-00-00', 33, 10, '2022-05-17', '2022-05-17'),
(155, 0, 0, '0000-00-00', 34, 10, '2022-05-17', '2022-05-17'),
(156, 0, 0, '0000-00-00', 35, 10, '2022-05-17', '2022-05-17'),
(157, 0, 0, '0000-00-00', 36, 10, '2022-05-17', '2022-05-17'),
(158, 0, 0, '0000-00-00', 37, 10, '2022-05-17', '2022-05-17'),
(159, 0, 0, '0000-00-00', 38, 10, '2022-05-17', '2022-05-17'),
(160, 0, 0, '0000-00-00', 39, 10, '2022-05-17', '2022-05-17'),
(161, 0, 0, '0000-00-00', 40, 10, '2022-05-17', '2022-05-17'),
(162, 0, 0, '0000-00-00', 41, 10, '2022-05-17', '2022-05-17'),
(163, 0, 0, '0000-00-00', 42, 10, '2022-05-17', '2022-05-17'),
(164, 0, 0, '0000-00-00', 43, 10, '2022-05-17', '2022-05-17'),
(165, 0, 0, '0000-00-00', 44, 10, '2022-05-17', '2022-05-17'),
(166, 0, 0, '0000-00-00', 45, 10, '2022-05-17', '2022-05-17'),
(167, 0, 0, '0000-00-00', 46, 10, '2022-05-17', '2022-05-17'),
(168, 0, 0, '0000-00-00', 47, 10, '2022-05-17', '2022-05-17'),
(169, 0, 0, '0000-00-00', 48, 10, '2022-05-17', '2022-05-17'),
(170, 0, 0, '0000-00-00', 49, 10, '2022-05-17', '2022-05-17'),
(171, 0, 0, '0000-00-00', 50, 10, '2022-05-17', '2022-05-17'),
(172, 0, 0, '0000-00-00', 51, 10, '2022-05-17', '2022-05-17'),
(173, 0, 0, '0000-00-00', 1, 10, '2022-05-17', '2022-05-17'),
(174, 0, 0, '0000-00-00', 2, 10, '2022-05-17', '2022-05-17'),
(175, 0, 0, '0000-00-00', 3, 10, '2022-05-17', '2022-05-17'),
(176, 0, 0, '0000-00-00', 4, 10, '2022-05-17', '2022-05-17'),
(177, 0, 0, '0000-00-00', 5, 10, '2022-05-17', '2022-05-17'),
(178, 0, 0, '0000-00-00', 6, 10, '2022-05-17', '2022-05-17'),
(179, 0, 0, '0000-00-00', 7, 10, '2022-05-17', '2022-05-17'),
(180, 0, 0, '0000-00-00', 8, 10, '2022-05-17', '2022-05-17'),
(181, 0, 0, '0000-00-00', 9, 10, '2022-05-17', '2022-05-17'),
(182, 0, 0, '0000-00-00', 10, 10, '2022-05-17', '2022-05-17'),
(183, 0, 0, '0000-00-00', 11, 10, '2022-05-17', '2022-05-17'),
(184, 0, 0, '0000-00-00', 12, 10, '2022-05-17', '2022-05-17'),
(185, 0, 0, '0000-00-00', 13, 10, '2022-05-17', '2022-05-17'),
(186, 0, 0, '0000-00-00', 14, 10, '2022-05-17', '2022-05-17'),
(187, 0, 0, '0000-00-00', 15, 10, '2022-05-17', '2022-05-17'),
(188, 0, 0, '0000-00-00', 16, 10, '2022-05-17', '2022-05-17'),
(189, 0, 0, '0000-00-00', 17, 10, '2022-05-17', '2022-05-17'),
(190, 0, 0, '0000-00-00', 18, 10, '2022-05-17', '2022-05-17'),
(191, 0, 0, '0000-00-00', 19, 10, '2022-05-17', '2022-05-17'),
(192, 0, 0, '0000-00-00', 20, 10, '2022-05-17', '2022-05-17'),
(193, 0, 0, '0000-00-00', 21, 10, '2022-05-17', '2022-05-17'),
(194, 0, 0, '0000-00-00', 22, 10, '2022-05-17', '2022-05-17'),
(195, 0, 0, '0000-00-00', 23, 10, '2022-05-17', '2022-05-17'),
(196, 0, 0, '0000-00-00', 24, 10, '2022-05-17', '2022-05-17'),
(197, 0, 0, '0000-00-00', 25, 10, '2022-05-17', '2022-05-17'),
(198, 0, 0, '0000-00-00', 26, 10, '2022-05-17', '2022-05-17'),
(199, 0, 0, '0000-00-00', 27, 10, '2022-05-17', '2022-05-17'),
(200, 0, 0, '0000-00-00', 28, 10, '2022-05-17', '2022-05-17'),
(201, 0, 0, '0000-00-00', 29, 10, '2022-05-17', '2022-05-17'),
(202, 0, 0, '0000-00-00', 30, 10, '2022-05-17', '2022-05-17'),
(203, 0, 0, '0000-00-00', 31, 10, '2022-05-17', '2022-05-17'),
(204, 0, 0, '0000-00-00', 32, 10, '2022-05-17', '2022-05-17'),
(205, 0, 0, '0000-00-00', 33, 10, '2022-05-17', '2022-05-17'),
(206, 0, 0, '0000-00-00', 34, 10, '2022-05-17', '2022-05-17'),
(207, 0, 0, '0000-00-00', 35, 10, '2022-05-17', '2022-05-17'),
(208, 0, 0, '0000-00-00', 36, 10, '2022-05-17', '2022-05-17'),
(209, 0, 0, '0000-00-00', 37, 10, '2022-05-17', '2022-05-17'),
(210, 0, 0, '0000-00-00', 38, 10, '2022-05-17', '2022-05-17'),
(211, 0, 0, '0000-00-00', 39, 10, '2022-05-17', '2022-05-17'),
(212, 0, 0, '0000-00-00', 40, 10, '2022-05-17', '2022-05-17'),
(213, 0, 0, '0000-00-00', 41, 10, '2022-05-17', '2022-05-17'),
(214, 0, 0, '0000-00-00', 42, 10, '2022-05-17', '2022-05-17'),
(215, 0, 0, '0000-00-00', 43, 10, '2022-05-17', '2022-05-17'),
(216, 0, 0, '0000-00-00', 44, 10, '2022-05-17', '2022-05-17'),
(217, 0, 0, '0000-00-00', 45, 10, '2022-05-17', '2022-05-17'),
(218, 0, 0, '0000-00-00', 46, 10, '2022-05-17', '2022-05-17'),
(219, 0, 0, '0000-00-00', 47, 10, '2022-05-17', '2022-05-17'),
(220, 0, 0, '0000-00-00', 48, 10, '2022-05-17', '2022-05-17'),
(221, 0, 0, '0000-00-00', 49, 10, '2022-05-17', '2022-05-17'),
(222, 0, 0, '0000-00-00', 50, 10, '2022-05-17', '2022-05-17'),
(223, 0, 0, '0000-00-00', 51, 10, '2022-05-17', '2022-05-17');

-- --------------------------------------------------------

--
-- Table structure for table `cryptos`
--

CREATE TABLE `cryptos` (
  `Id` int(11) NOT NULL,
  `Name` varchar(10) NOT NULL,
  `Staking_percentage` decimal(9,2) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cryptos`
--

INSERT INTO `cryptos` (`Id`, `Name`, `Staking_percentage`, `createdAt`, `updatedAt`) VALUES
(1, 'BTC', '0.00', '0000-00-00', '0000-00-00'),
(2, 'ETH', '4.25', '0000-00-00', '0000-00-00'),
(3, 'USDT', '0.00', '0000-00-00', '0000-00-00'),
(4, 'USDC', '0.00', '0000-00-00', '0000-00-00'),
(5, 'BNB', '7.25', '0000-00-00', '0000-00-00'),
(6, 'EUR', '0.00', '0000-00-00', '0000-00-00'),
(7, 'XRP', '0.00', '0000-00-00', '0000-00-00'),
(8, 'ADA', '4.99', '0000-00-00', '0000-00-00'),
(9, 'SOL', '5.26', '0000-00-00', '0000-00-00'),
(10, 'BUSD', '0.00', '0000-00-00', '0000-00-00'),
(11, 'DOT', '13.94', '0000-00-00', '0000-00-00'),
(12, 'DOGE', '0.00', '0000-00-00', '0000-00-00'),
(13, 'AVAX', '8.98', '0000-00-00', '0000-00-00'),
(14, 'WBTC', '0.00', '0000-00-00', '0000-00-00'),
(15, 'STETH', '0.00', '0000-00-00', '0000-00-00'),
(16, 'SHIB', '0.00', '0000-00-00', '0000-00-00'),
(17, 'TRX', '4.95', '0000-00-00', '0000-00-00'),
(18, 'DAI', '0.00', '0000-00-00', '0000-00-00'),
(19, 'CRO', '14.75', '0000-00-00', '0000-00-00'),
(20, 'LTC', '0.00', '0000-00-00', '0000-00-00'),
(21, 'MATIC', '17.44', '0000-00-00', '0000-00-00'),
(22, 'NEAR', '-0.55', '0000-00-00', '0000-00-00'),
(23, 'LEO', '0.00', '0000-00-00', '0000-00-00'),
(24, 'FTT', '0.00', '0000-00-00', '0000-00-00'),
(25, 'BCH', '0.00', '0000-00-00', '0000-00-00'),
(26, 'LINK', '0.00', '0000-00-00', '0000-00-00'),
(27, 'XLM', '0.00', '0000-00-00', '0000-00-00'),
(28, 'ATOM', '16.41', '0000-00-00', '0000-00-00'),
(29, 'OKB', '0.00', '0000-00-00', '0000-00-00'),
(30, 'ALGO', '7.68', '0000-00-00', '0000-00-00'),
(31, 'FLOW', '8.31', '0000-00-00', '0000-00-00'),
(32, 'XMR', '0.00', '0000-00-00', '0000-00-00'),
(33, 'ETC', '0.00', '0000-00-00', '0000-00-00'),
(34, 'APE', '0.00', '0000-00-00', '0000-00-00'),
(35, 'UNI', '0.00', '0000-00-00', '0000-00-00'),
(36, 'EGLD', '12.58', '0000-00-00', '0000-00-00'),
(37, 'HBAR', '0.00', '0000-00-00', '0000-00-00'),
(38, 'VET', '0.00', '0000-00-00', '0000-00-00'),
(39, 'ICP', '8.04', '0000-00-00', '0000-00-00'),
(40, 'MANA', '0.00', '0000-00-00', '0000-00-00'),
(41, 'TFUEL', '0.00', '0000-00-00', '0000-00-00'),
(42, 'FIL', '0.00', '0000-00-00', '0000-00-00'),
(43, 'MIM', '0.00', '0000-00-00', '0000-00-00'),
(44, 'SAND', '0.00', '0000-00-00', '0000-00-00'),
(45, 'AXS', '84.12', '0000-00-00', '0000-00-00'),
(46, 'CETH', '0.00', '0000-00-00', '0000-00-00'),
(47, 'UST', '0.00', '0000-00-00', '0000-00-00'),
(48, 'XTZ', '2.07', '0000-00-00', '0000-00-00'),
(49, 'DFI', '48.27', '0000-00-00', '0000-00-00'),
(50, 'LUNA', '0.00', '0000-00-00', '0000-00-00'),
(51, 'XCN', '0.00', '0000-00-00', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `portfolios`
--

CREATE TABLE `portfolios` (
  `Id` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `fk_user` int(11) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `portfolios`
--

INSERT INTO `portfolios` (`Id`, `Name`, `fk_user`, `createdAt`, `updatedAt`) VALUES
(1, 'PIRMA pirmo', 2, '0000-00-00', '0000-00-00'),
(2, 'ANTRA PIRMO', 2, '0000-00-00', '0000-00-00'),
(3, 'PIRMA ANTRO', 1, '0000-00-00', '0000-00-00'),
(4, 'antra antro', 1, '0000-00-00', '0000-00-00'),
(5, 'Default', 3, '2022-05-17', '2022-05-17'),
(6, 'Default', 4, '2022-05-17', '2022-05-17'),
(7, 'Default', 5, '2022-05-17', '2022-05-17'),
(9, 'Default', 7, '2022-05-17', '2022-05-17'),
(10, 'Default', 6, '2022-05-17', '2022-05-17');

-- --------------------------------------------------------

--
-- Table structure for table `trade_histories`
--

CREATE TABLE `trade_histories` (
  `Id` int(11) NOT NULL,
  `fk_Bought_currency` int(11) NOT NULL,
  `fk_Bought_with_currency` int(11) NOT NULL,
  `Amount` int(11) NOT NULL,
  `Date` date NOT NULL,
  `Price_of_first` int(20) NOT NULL,
  `Price_of_second` int(20) NOT NULL,
  `fk_portfolio` int(11) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Id` int(11) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Id`, `Email`, `Password`, `createdAt`, `updatedAt`) VALUES
(1, 'test@gmail.com', 'password', '0000-00-00', '0000-00-00'),
(2, 'test2@GMAIL.com', 'vilkas', '0000-00-00', '0000-00-00'),
(3, 'test3@gmail.com', 'Testas123', '2022-05-17', '2022-05-17'),
(4, 'test4@gmail.com', 'Testas123', '2022-05-17', '2022-05-17'),
(5, 'test5@gmail.com', 'Testas123', '2022-05-17', '2022-05-17'),
(6, 'test6@gmail.com', 'Testas1234', '2022-05-17', '2022-05-17'),
(7, 'test7@gmail.com', 'Testas1234', '2022-05-17', '2022-05-17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `amounts`
--
ALTER TABLE `amounts`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Has1` (`fk_portfolio`),
  ADD KEY `Is_included_in` (`fk_crypto`);

--
-- Indexes for table `cryptos`
--
ALTER TABLE `cryptos`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `portfolios`
--
ALTER TABLE `portfolios`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Has` (`fk_user`);

--
-- Indexes for table `trade_histories`
--
ALTER TABLE `trade_histories`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Has2` (`fk_portfolio`),
  ADD KEY `Has3` (`fk_Bought_currency`),
  ADD KEY `Has4` (`fk_Bought_with_currency`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `amounts`
--
ALTER TABLE `amounts`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=224;

--
-- AUTO_INCREMENT for table `cryptos`
--
ALTER TABLE `cryptos`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `portfolios`
--
ALTER TABLE `portfolios`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `trade_histories`
--
ALTER TABLE `trade_histories`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `amounts`
--
ALTER TABLE `amounts`
  ADD CONSTRAINT `Has1` FOREIGN KEY (`fk_portfolio`) REFERENCES `portfolios` (`Id`),
  ADD CONSTRAINT `Is_included_in` FOREIGN KEY (`fk_crypto`) REFERENCES `cryptos` (`Id`);

--
-- Constraints for table `portfolios`
--
ALTER TABLE `portfolios`
  ADD CONSTRAINT `Has` FOREIGN KEY (`fk_user`) REFERENCES `users` (`Id`);

--
-- Constraints for table `trade_histories`
--
ALTER TABLE `trade_histories`
  ADD CONSTRAINT `Has2` FOREIGN KEY (`fk_portfolio`) REFERENCES `portfolios` (`Id`),
  ADD CONSTRAINT `Has3` FOREIGN KEY (`fk_Bought_currency`) REFERENCES `cryptos` (`Id`),
  ADD CONSTRAINT `Has4` FOREIGN KEY (`fk_Bought_with_currency`) REFERENCES `cryptos` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;