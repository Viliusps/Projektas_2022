-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 29, 2022 at 02:14 PM
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
-- Database: `inzinerija`
--

-- --------------------------------------------------------

--
-- Table structure for table `amounts`
--

CREATE TABLE `amounts` (
  `Id` int(11) NOT NULL,
  `Amount` decimal(9,2) NOT NULL,
  `Staking_amount` decimal(9,2) NOT NULL,
  `When_staked` datetime NOT NULL,
  `fk_crypto` int(11) NOT NULL,
  `fk_portfolio` int(11) NOT NULL,
  `createdAt` Date NOT NULL,
  `updatedAt` Date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `amounts`
--

INSERT INTO `amounts` (`Id`, `Amount`, `Staking_amount`, `When_staked`, `fk_crypto`, `fk_portfolio`, `createdAt`, `updatedAt`) VALUES
(1, 50, 0, '2022-05-17 13:00', 3, 4, 2022-04-29, 2022-04-29),
(2, 100, 0, '2022-05-17 13:00', 2, 1, 2022-04-29, 2022-04-29);

-- --------------------------------------------------------

--
-- Table structure for table `cryptos`
--

CREATE TABLE `cryptos` (
  `Id` int(11) NOT NULL,
  `Name` varchar(10) NOT NULL,
  `Staking_percentage` decimal(9,2) NOT NULL,
  `createdAt` Date NOT NULL,
  `updatedAt` Date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cryptos`
--

INSERT INTO `cryptos` (`Id`, `Name`, `Staking_percentage`, `createdAt`, `updatedAt`) VALUES
(1, 'BTC', 0, '0000-00-00', '0000-00-00'),
(2, 'ETH', 4.25, '0000-00-00', '0000-00-00'),
(3, 'USDT',0, '0000-00-00', '0000-00-00'),
(4, 'USDC', 0, '0000-00-00', '0000-00-00'),
(5, 'BNB', 7.25, '0000-00-00', '0000-00-00'),
(6, 'EUR', 0, '0000-00-00', '0000-00-00'),
(7, 'XRP', 0, '0000-00-00', '0000-00-00'),
(8, 'ADA', 4.99, '0000-00-00', '0000-00-00'),
(9, 'SOL', 5.26, '0000-00-00', '0000-00-00'),
(10, 'BUSD', 0, '0000-00-00', '0000-00-00'),
(11, 'DOT', 13.94, '0000-00-00', '0000-00-00'),
(12, 'DOGE', 0, '0000-00-00', '0000-00-00'),
(13, 'AVAX', 8.98, '0000-00-00', '0000-00-00'),
(14, 'WBTC', 0, '0000-00-00', '0000-00-00'),
(15, 'STETH', 0, '0000-00-00', '0000-00-00'),
(16, 'SHIB', 0, '0000-00-00', '0000-00-00'),
(17, 'TRX', 4.95, '0000-00-00', '0000-00-00'),
(18, 'DAI', 0, '0000-00-00', '0000-00-00'),
(19, 'CRO', 14.75, '0000-00-00', '0000-00-00'),
(20, 'LTC', 0, '0000-00-00', '0000-00-00'),
(21, 'MATIC', 17.44, '0000-00-00', '0000-00-00'),
(22, 'NEAR', -0.55, '0000-00-00', '0000-00-00'),
(23, 'LEO', 0, '0000-00-00', '0000-00-00'),
(24, 'FTT', 0, '0000-00-00', '0000-00-00'),
(25, 'BCH', 0, '0000-00-00', '0000-00-00'),
(26, 'LINK', 0, '0000-00-00', '0000-00-00'),
(27, 'XLM', 0, '0000-00-00', '0000-00-00'),
(28, 'ATOM', 16.41, '0000-00-00', '0000-00-00'),
(29, 'OKB', 0, '0000-00-00', '0000-00-00'),
(30, 'ALGO', 7.68, '0000-00-00', '0000-00-00'),
(31, 'FLOW', 8.31, '0000-00-00', '0000-00-00'),
(32, 'XMR', 0, '0000-00-00', '0000-00-00'),
(33, 'ETC', 0, '0000-00-00', '0000-00-00'),
(34, 'APE', 0, '0000-00-00', '0000-00-00'),
(35, 'UNI', 0, '0000-00-00', '0000-00-00'),
(36, 'EGLD', 12.58, '0000-00-00', '0000-00-00'),
(37, 'HBAR', 0, '0000-00-00', '0000-00-00'),
(38, 'VET', 0, '0000-00-00', '0000-00-00'),
(39, 'ICP', 8.04, '0000-00-00', '0000-00-00'),
(40, 'MANA', 0, '0000-00-00', '0000-00-00'),
(41, 'TFUEL', 0, '0000-00-00', '0000-00-00'),
(42, 'FIL', 0, '0000-00-00', '0000-00-00'),
(43, 'MIM', 0, '0000-00-00', '0000-00-00'),
(44, 'SAND', 0, '0000-00-00', '0000-00-00'),
(45, 'AXS', 84.12, '0000-00-00', '0000-00-00'),
(46, 'CETH', 0, '0000-00-00', '0000-00-00'),
(47, 'UST', 0, '0000-00-00', '0000-00-00'),
(48, 'XTZ', 2.07, '0000-00-00', '0000-00-00'),
(49, 'DFI', 48.27, '0000-00-00', '0000-00-00'),
(50, 'LUNA', 0, '0000-00-00', '0000-00-00'),
(51, 'XCN', 0, '0000-00-00', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `portfolios`
--

CREATE TABLE `portfolios` (
  `Id` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `fk_user` int(11) NOT NULL,
  `createdAt` Date NOT NULL,
  `updatedAt` Date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `portfolios`
--

INSERT INTO `portfolios` (`Id`, `Name`, `fk_user`, `createdAt`, `updatedAt`) VALUES
(1, 'PIRMA pirmo', 2, 2022-04-29, 2022-04-29),
(2, 'ANTRA PIRMO', 2, 2022-04-29, 2022-04-29),
(3, 'PIRMA ANTRO', 1, 2022-04-29, 2022-04-29),
(4, 'antra antro', 1, 2022-04-29, 2022-04-29);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Id` int(11) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `createdAt` Date NOT NULL,
  `updatedAt` Date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Id`, `Email`, `Password`, `createdAt`, `updatedAt`) VALUES
(1, 'test@gmail.com', 'password', 2022-04-29, 2022-04-29),
(2, 'test2@GMAIL.com', 'vilkas', 2022-04-29, 2022-04-29);



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
  `createdAt` Date NOT NULL,
  `updatedAt` Date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
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
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id`);
  
--
-- Indexes for table `trade_histories`
--
ALTER TABLE `trade_histories`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Has2` (`fk_portfolio`),
  ADD KEY `Has3` (`fk_Bought_currency`),
  ADD KEY `Has4` (`fk_Bought_with_currency`);
--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `amounts`
--
ALTER TABLE `amounts`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `cryptos`
--
ALTER TABLE `cryptos`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `portfolios`
--
ALTER TABLE `portfolios`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
  
--
-- AUTO_INCREMENT for table `trade_histories`
--
 ALTER TABLE `trade_histories`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

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
-- Constraints for table `trade_histories`
--
ALTER TABLE `trade_histories`
  ADD CONSTRAINT `Has2` FOREIGN KEY (`fk_portfolio`) REFERENCES `portfolios` (`Id`),
  ADD CONSTRAINT `Has3` FOREIGN KEY (`fk_Bought_currency`) REFERENCES `cryptos` (`Id`),
  ADD CONSTRAINT `Has4` FOREIGN KEY (`fk_Bought_with_currency`) REFERENCES `cryptos` (`Id`);
  
--
-- Constraints for table `portfolios`
--
ALTER TABLE `portfolios`
  ADD CONSTRAINT `Has` FOREIGN KEY (`fk_user`) REFERENCES `users` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
