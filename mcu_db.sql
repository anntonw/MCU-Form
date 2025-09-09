-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 09, 2025 at 06:48 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mcu_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `doctor_tb`
--

CREATE TABLE `doctor_tb` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `specialty` varchar(100) DEFAULT NULL,
  `pat` varchar(100) NOT NULL,
  `idmd5` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `doctor_tb`
--

INSERT INTO `doctor_tb` (`id`, `name`, `specialty`, `pat`, `idmd5`) VALUES
(1, 'dr. Melinda Balqis Annur Zahwa', 'dokter umum', 'LdDIU7PE434534SOKkFPhiTKztW8', 'aa5b23dc88a3fff06845c996d405883e'),
(2, 'dr. Amanatun Avidah', 'dokter umum', 'aYAH6s8223PCMRjfsFAkKilCB9uz2VvQQ', 'b8af0fe5276d290b9b1fb8fafff612c8');

-- --------------------------------------------------------

--
-- Table structure for table `medical_reports`
--

CREATE TABLE `medical_reports` (
  `id` int(11) NOT NULL,
  `medical_record_no` varchar(50) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `sex` enum('Male','Female') DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `nationality` varchar(50) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `company` varchar(100) DEFAULT NULL,
  `photo_path` varchar(255) DEFAULT NULL,
  `diphteria` enum('Yes','No') NOT NULL DEFAULT 'No',
  `sinusitis` enum('Yes','No') NOT NULL DEFAULT 'No',
  `bronchitis_chronic` enum('Yes','No') NOT NULL DEFAULT 'No',
  `pulmonary_tbc` enum('Yes','No') NOT NULL DEFAULT 'No',
  `asthma` enum('Yes','No') NOT NULL DEFAULT 'No',
  `covid` enum('Yes','No') NOT NULL DEFAULT 'No',
  `kidney_disease` enum('Yes','No') NOT NULL DEFAULT 'No',
  `epilepsy` enum('Yes','No') NOT NULL DEFAULT 'No',
  `hypertension` enum('Yes','No') NOT NULL DEFAULT 'No',
  `vericose_vein` enum('Yes','No') NOT NULL DEFAULT 'No',
  `rheumatoid_arthritis` enum('Yes','No') NOT NULL DEFAULT 'No',
  `thyroid` enum('Yes','No') NOT NULL DEFAULT 'No',
  `stroke` enum('Yes','No') NOT NULL DEFAULT 'No',
  `polio` enum('Yes','No') NOT NULL DEFAULT 'No',
  `meningitis` enum('Yes','No') NOT NULL DEFAULT 'No',
  `hepatitis` enum('Yes','No') NOT NULL DEFAULT 'No',
  `tumor` enum('Yes','No') NOT NULL DEFAULT 'No',
  `other_history` varchar(255) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `weight` int(11) DEFAULT NULL,
  `blood_pressure` varchar(20) DEFAULT NULL,
  `pulse` varchar(20) DEFAULT NULL,
  `eyes_right` varchar(20) DEFAULT NULL,
  `eyes_left` varchar(20) DEFAULT NULL,
  `color_vision` enum('NORMAL','ABNORMAL') NOT NULL DEFAULT 'NORMAL',
  `color_blindness` enum('NORMAL','ABNORMAL') NOT NULL DEFAULT 'NORMAL',
  `hemoglobin` varchar(20) DEFAULT NULL,
  `sgot` varchar(20) DEFAULT NULL,
  `sgpt` varchar(20) DEFAULT NULL,
  `chest_xray` enum('NORMAL','ABNORMAL') NOT NULL DEFAULT 'NORMAL',
  `head_neck` enum('NORMAL','ABNORMAL') DEFAULT NULL,
  `hearing_right` enum('NORMAL','ABNORMAL') DEFAULT NULL,
  `hearing_left` enum('NORMAL','ABNORMAL') DEFAULT NULL,
  `abdomen_hernia` tinyint(1) NOT NULL DEFAULT 0,
  `abdomen_tumor` tinyint(1) NOT NULL DEFAULT 0,
  `hbsag` enum('NEGATIVE','POSITIVE') DEFAULT NULL,
  `vdrl` enum('NEGATIVE','POSITIVE') DEFAULT NULL,
  `tpha` enum('NEGATIVE','POSITIVE') DEFAULT NULL,
  `hiv` enum('REACTIVE','NON_REACTIVE') DEFAULT NULL,
  `skin_disease` tinyint(1) NOT NULL DEFAULT 0,
  `nail` tinyint(1) NOT NULL DEFAULT 0,
  `urinalysis_protein` tinyint(1) NOT NULL DEFAULT 0,
  `urinalysis_bilirubin` tinyint(1) NOT NULL DEFAULT 0,
  `urinalysis_glucose` tinyint(1) NOT NULL DEFAULT 0,
  `urinalysis_other` text DEFAULT NULL,
  `internal_heart` tinyint(1) NOT NULL DEFAULT 0,
  `internal_lung` tinyint(1) NOT NULL DEFAULT 0,
  `internal_liver` tinyint(1) NOT NULL DEFAULT 0,
  `internal_spleen` tinyint(1) NOT NULL DEFAULT 0,
  `internal_kidney` tinyint(1) NOT NULL DEFAULT 0,
  `internal_thyroid` tinyint(1) NOT NULL DEFAULT 0,
  `conclusion` text DEFAULT NULL,
  `doctor_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `report_files`
--

CREATE TABLE `report_files` (
  `id` int(11) NOT NULL,
  `report_id` int(11) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `status` enum('signed','unsigned') DEFAULT 'unsigned',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `doctor_tb`
--
ALTER TABLE `doctor_tb`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `medical_reports`
--
ALTER TABLE `medical_reports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `report_files`
--
ALTER TABLE `report_files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `report_id` (`report_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `doctor_tb`
--
ALTER TABLE `doctor_tb`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `medical_reports`
--
ALTER TABLE `medical_reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT for table `report_files`
--
ALTER TABLE `report_files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `report_files`
--
ALTER TABLE `report_files`
  ADD CONSTRAINT `report_files_ibfk_1` FOREIGN KEY (`report_id`) REFERENCES `medical_reports` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
