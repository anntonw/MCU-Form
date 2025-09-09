-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 09, 2025 at 05:42 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.26

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `doctor_tb`
--

INSERT INTO `doctor_tb` (`id`, `name`, `specialty`, `pat`, `idmd5`) VALUES
(1, 'dr. Melinda Balqis Annur Zahwa', 'dokter umum', 'LdDIU7PEGHFxqBTFFwzbPuSOKkFPhiTKztW8', 'aa5b23dc88a3fff06845c996d405883e'),
(2, 'dr. Amanatun Avidah', 'dokter umum', 'aYAH6s8fNFBvzPCMRjfsFAkKilCB9uz2VvQQ', 'b8af0fe5276d290b9b1fb8fafff612c8');

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `medical_reports`
--

INSERT INTO `medical_reports` (`id`, `medical_record_no`, `name`, `sex`, `birth_date`, `nationality`, `address`, `company`, `photo_path`, `diphteria`, `sinusitis`, `bronchitis_chronic`, `pulmonary_tbc`, `asthma`, `covid`, `kidney_disease`, `epilepsy`, `hypertension`, `vericose_vein`, `rheumatoid_arthritis`, `thyroid`, `stroke`, `polio`, `meningitis`, `hepatitis`, `tumor`, `other_history`, `height`, `weight`, `blood_pressure`, `pulse`, `eyes_right`, `eyes_left`, `color_vision`, `color_blindness`, `hemoglobin`, `sgot`, `sgpt`, `chest_xray`, `head_neck`, `hearing_right`, `hearing_left`, `abdomen_hernia`, `abdomen_tumor`, `hbsag`, `vdrl`, `tpha`, `hiv`, `skin_disease`, `nail`, `urinalysis_protein`, `urinalysis_bilirubin`, `urinalysis_glucose`, `urinalysis_other`, `internal_heart`, `internal_lung`, `internal_liver`, `internal_spleen`, `internal_kidney`, `internal_thyroid`, `conclusion`, `doctor_id`, `created_at`) VALUES
(70, '420091', 'ANDIKA DIANTORO, TN', 'Male', '2005-06-07', 'INDONESIA', 'GRINTING RT 07/05 BULAKAMBA', 'LPK JINSEI MICHI INDONESIA', '/uploads/1757295716061-228187037.jpeg', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', NULL, 167, 48, '126/67', '87', '6/6', '6/6', 'NORMAL', 'NORMAL', NULL, NULL, NULL, 'NORMAL', 'NORMAL', 'NORMAL', 'NORMAL', 1, 1, 'NEGATIVE', 'NEGATIVE', 'NEGATIVE', 'NON_REACTIVE', 1, 1, 1, 1, 1, NULL, 1, 1, 1, 1, 1, 1, 'Fit For Duty', 1, '2025-09-08 01:41:56'),
(74, '420092', 'TARMUNI, TN', 'Male', '1978-06-08', 'INDONESIA', 'SAWOJAJAR RT 02/10 WANASARI', NULL, NULL, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'NORMAL', 'NORMAL', NULL, NULL, NULL, 'NORMAL', 'NORMAL', 'NORMAL', 'NORMAL', 1, 1, 'NEGATIVE', 'NEGATIVE', 'NEGATIVE', 'NON_REACTIVE', 1, 1, 1, 1, 1, NULL, 1, 1, 1, 1, 1, 1, 'Fir for Duty ', 1, '2025-09-08 02:22:38'),
(75, '420091', 'ANDIKA DIANTORO, TN', 'Male', '2005-06-07', 'INDONESIA', 'GRINTING RT 07/05 BULAKAMBA', 'LPK JINSEI MICHI INDONESIA ', '/uploads/1757298647307-771822292.jpeg', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', NULL, 167, 48, '126/67', '87', '6/6', '6/6', 'NORMAL', 'NORMAL', NULL, NULL, NULL, 'NORMAL', 'NORMAL', 'NORMAL', 'NORMAL', 1, 1, 'NEGATIVE', 'NEGATIVE', 'NEGATIVE', 'NON_REACTIVE', 1, 1, 1, 1, 1, NULL, 1, 1, 1, 1, 1, 1, 'Fit For Duty', 1, '2025-09-08 02:30:47'),
(76, '420101', 'WAKHIDIN ZAEN, TN', 'Male', '1985-09-27', 'INDONESIA', 'SAWOJAJAR RT 03/07 WANASARI', 'LPK JINSEI MICHI INDONESIA', '/uploads/1757298911792-938949569.jpeg', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', NULL, 162, 63, '111/73', '78', '6/6', '6/6', 'NORMAL', 'NORMAL', NULL, NULL, NULL, 'NORMAL', 'NORMAL', 'NORMAL', 'NORMAL', 1, 1, 'NEGATIVE', 'NEGATIVE', 'NEGATIVE', 'NON_REACTIVE', 1, 1, 1, 1, 1, NULL, 1, 1, 1, 1, 1, 1, 'Fit For Duty', 1, '2025-09-08 02:35:11'),
(77, '420092', 'TARMUNI, TN', 'Male', '1978-06-08', 'INDONESIA', 'SAWOJAJAR RT 02/10 WANASARI', 'LPK JINSEIMICHI INDONESIA', NULL, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'DM TIPE 2', 170, 58, '121/81', '80', '6/6', '6/6', 'NORMAL', 'NORMAL', NULL, NULL, NULL, 'ABNORMAL', 'NORMAL', 'NORMAL', 'NORMAL', 1, 1, 'NEGATIVE', 'NEGATIVE', 'NEGATIVE', 'NON_REACTIVE', 1, 1, 1, 1, 0, NULL, 1, 1, 1, 1, 1, 1, 'PENDING \r\nX-RAY : TB PARU RELAPS', 1, '2025-09-08 02:39:55'),
(78, '420092', 'TARMUNI, TN', 'Male', '1978-06-08', 'INDONESIA', 'SAWOJAJAR RT 02/10 WANASARI', NULL, NULL, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'DM TIPE 2', 170, 58, '121/81', '80', '6/6', '6/6', 'NORMAL', 'NORMAL', NULL, NULL, NULL, 'ABNORMAL', 'NORMAL', 'NORMAL', 'NORMAL', 1, 1, 'NEGATIVE', 'NEGATIVE', 'NEGATIVE', 'NON_REACTIVE', 1, 1, 1, 1, 0, NULL, 1, 1, 1, 1, 1, 1, 'PENDING\r\nKESAN X- RAY: TB PARU RELAPS', 1, '2025-09-08 02:42:35'),
(79, '-', '-', 'Male', '1978-06-08', '-', '-', '-', NULL, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'DM TIPE 2', NULL, 58, '121/81', '80', NULL, '6/6', 'NORMAL', 'NORMAL', NULL, NULL, NULL, 'ABNORMAL', 'NORMAL', 'NORMAL', 'NORMAL', 1, 1, 'NEGATIVE', 'NEGATIVE', 'NEGATIVE', 'NON_REACTIVE', 1, 1, 1, 1, 0, NULL, 1, 1, 1, 1, 1, 1, NULL, 1, '2025-09-08 02:44:50');

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `report_files`
--

INSERT INTO `report_files` (`id`, `report_id`, `file_path`, `status`, `created_at`) VALUES
(4, 70, '7cbbc409ec990f19c78c75bd1e06f215.pdf', 'signed', '2025-09-08 01:41:59'),
(8, 74, 'ad61ab143223efbc24c7d2583be69251.pdf', 'signed', '2025-09-08 02:22:42'),
(9, 75, 'd09bf41544a3365a46c9077ebb5e35c3.pdf', 'signed', '2025-09-08 02:30:50'),
(10, 76, 'fbd7939d674997cdb4692d34de8633c4.pdf', 'signed', '2025-09-08 02:35:15'),
(11, 77, '28dd2c7955ce926456240b2ff0100bde.pdf', 'signed', '2025-09-08 02:39:59'),
(12, 78, '35f4a8d465e6e1edc05f3d8ab658c551.pdf', 'signed', '2025-09-08 02:42:38'),
(13, 79, 'd1fe173d08e959397adf34b1d77e88d7.pdf', 'signed', '2025-09-08 02:44:52');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT for table `report_files`
--
ALTER TABLE `report_files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

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
