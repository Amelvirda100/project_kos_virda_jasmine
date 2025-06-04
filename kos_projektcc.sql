-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 04, 2025 at 12:13 PM
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
-- Database: `kos_projektcc`
--

-- --------------------------------------------------------

--
-- Table structure for table `daftar_sewa`
--

CREATE TABLE `daftar_sewa` (
  `id_sewa` int(11) NOT NULL,
  `id_penyewa` int(11) NOT NULL,
  `kamar_id` int(11) NOT NULL,
  `tgl_mulai` date NOT NULL,
  `tgl_selesai` date DEFAULT NULL,
  `status_sewa` enum('Aktif','Selesai','Dibatalkan') DEFAULT 'Aktif'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `daftar_sewa`
--

INSERT INTO `daftar_sewa` (`id_sewa`, `id_penyewa`, `kamar_id`, `tgl_mulai`, `tgl_selesai`, `status_sewa`) VALUES
(42, 4, 4, '2025-06-05', '2025-06-12', 'Aktif'),
(43, 8, 8, '2025-06-13', '2025-06-14', 'Aktif');

-- --------------------------------------------------------

--
-- Table structure for table `kamar`
--

CREATE TABLE `kamar` (
  `kamar_id` int(11) NOT NULL,
  `no_kamar` varchar(10) NOT NULL,
  `tipe_kamar` enum('Ekonomi','Standar','VIP') NOT NULL,
  `harga` int(11) NOT NULL,
  `status` enum('Kosong','Terisi') DEFAULT 'Kosong'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kamar`
--

INSERT INTO `kamar` (`kamar_id`, `no_kamar`, `tipe_kamar`, `harga`, `status`) VALUES
(4, '1', 'Standar', 2000, 'Terisi'),
(8, '5', 'Ekonomi', 1000, 'Terisi');

-- --------------------------------------------------------

--
-- Table structure for table `penyewa`
--

CREATE TABLE `penyewa` (
  `id_penyewa` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `alamat` text DEFAULT NULL,
  `no_telp` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `penyewa`
--

INSERT INTO `penyewa` (`id_penyewa`, `nama`, `alamat`, `no_telp`) VALUES
(4, 'thanos', 'mars', '222'),
(5, 'juwita', 'trenggono. jawa timur', '3333'),
(8, 'lala', 'lili', '6789');

-- --------------------------------------------------------

--
-- Table structure for table `riwayat_sewa`
--

CREATE TABLE `riwayat_sewa` (
  `id_riwayat` int(11) NOT NULL,
  `nama_penyewa` varchar(100) NOT NULL,
  `alamat_penyewa` text NOT NULL,
  `no_telp_penyewa` varchar(15) NOT NULL,
  `no_kamar` varchar(10) NOT NULL,
  `tipe_kamar` enum('Ekonomi','Standar','VIP') NOT NULL,
  `harga_kamar` int(11) NOT NULL,
  `tanggal_mulai` date NOT NULL,
  `tanggal_selesai` date NOT NULL,
  `status` enum('aktif','selesai','dibatalkan') NOT NULL DEFAULT 'selesai'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `riwayat_sewa`
--

INSERT INTO `riwayat_sewa` (`id_riwayat`, `nama_penyewa`, `alamat_penyewa`, `no_telp_penyewa`, `no_kamar`, `tipe_kamar`, `harga_kamar`, `tanggal_mulai`, `tanggal_selesai`, `status`) VALUES
(28, 'thanos', 'mars', '222', '1', 'Standar', 2000, '2025-06-05', '2025-06-12', 'aktif'),
(29, 'lala', 'lili', '6789', '5', 'Ekonomi', 1000, '2025-06-13', '2025-06-14', 'aktif');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `refresh_token` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `refresh_token`, `createdAt`, `updatedAt`) VALUES
(1, 'amel', 'amel@gmail.com', '$2b$07$06coA6EX7h5.aZSARLkmVOv11nLf.OLD.YxlTAyShXXAR9WCu5tGK', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFtZWwiLCJlbWFpbCI6ImFtZWxAZ21haWwuY29tIiwiY3JlYXRlZEF0IjoiMjAyNS0wNi0wMVQxMDozMDo1NS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyNS0wNi0wNFQwODoxMjozNC4wMDBaIiwiaWF0IjoxNzQ5MDI1MzA3LCJleHAiOjE3NDkxMTE3MDd9.xkO_sJAYOUddYI5REb8-qajMtr-l-SKOSm1r-ZHvqBU', '2025-06-01 10:30:55', '2025-06-04 08:21:47'),
(2, 'y', 'y@gmail.com', '$2b$07$ndUXCGdzX2QtjIziG3OtiufxRLQLKIATgzB6GP1qb68KqhN/.M1FK', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6InkiLCJlbWFpbCI6InlAZ21haWwuY29tIiwiY3JlYXRlZEF0IjoiMjAyNS0wNi0wNFQwOTo0ODo0OC4wMDBaIiwidXBkYXRlZEF0IjoiMjAyNS0wNi0wNFQwOTo0ODo0OC4wMDBaIiwiaWF0IjoxNzQ5MDMwNTM5LCJleHAiOjE3NDkxMTY5Mzl9.yBigouF2VTYNxGG83tv1IyAb3KDBmvnyTbwz4Ie8qBo', '2025-06-04 09:48:48', '2025-06-04 09:48:59');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `daftar_sewa`
--
ALTER TABLE `daftar_sewa`
  ADD PRIMARY KEY (`id_sewa`),
  ADD KEY `id_penyewa` (`id_penyewa`),
  ADD KEY `kamar_id` (`kamar_id`);

--
-- Indexes for table `kamar`
--
ALTER TABLE `kamar`
  ADD PRIMARY KEY (`kamar_id`),
  ADD UNIQUE KEY `no_kamar` (`no_kamar`);

--
-- Indexes for table `penyewa`
--
ALTER TABLE `penyewa`
  ADD PRIMARY KEY (`id_penyewa`);

--
-- Indexes for table `riwayat_sewa`
--
ALTER TABLE `riwayat_sewa`
  ADD PRIMARY KEY (`id_riwayat`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `daftar_sewa`
--
ALTER TABLE `daftar_sewa`
  MODIFY `id_sewa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `kamar`
--
ALTER TABLE `kamar`
  MODIFY `kamar_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `penyewa`
--
ALTER TABLE `penyewa`
  MODIFY `id_penyewa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `riwayat_sewa`
--
ALTER TABLE `riwayat_sewa`
  MODIFY `id_riwayat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `daftar_sewa`
--
ALTER TABLE `daftar_sewa`
  ADD CONSTRAINT `daftar_sewa_ibfk_1` FOREIGN KEY (`id_penyewa`) REFERENCES `penyewa` (`id_penyewa`),
  ADD CONSTRAINT `daftar_sewa_ibfk_2` FOREIGN KEY (`kamar_id`) REFERENCES `kamar` (`kamar_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
