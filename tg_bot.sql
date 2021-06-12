-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mer. 21 avr. 2021 à 09:14
-- Version du serveur :  8.0.23-0ubuntu0.20.04.1
-- Version de PHP : 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_Otg_botN_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `tg_bot`
--

-- --------------------------------------------------------

--
-- Structure de la table `insultes`
--

CREATE TABLE `insultes` (
  `id` int NOT NULL,
  `name` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `sender` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `insultes`
--

INSERT INTO `insultes` (`id`, `name`, `sender`) VALUES
(1, 'gros nul', '!Arsène '),
(2, 'gros naze', '!Arsène '),
(3, 't\'es qu\'une grosse merde', '!Arsène '),
(4, 'tu pues la pisse', '!Arsène '),
(5, 't\'es debile', '!Arsène '),
(6, 'nique ta mere', '!Arsène '),
(7, 'sale chien', '!Arsène '),
(8, 'attardé mental', '!Arsène '),
(9, 'gros retardé', '!Arsène '),
(10, 'sale singe', '!Arsène '),
(11, 't\'es un immmense trizomique', '!Arsène '),
(12, 't\'es un titanesque fdp', '!Arsène '),
(13, 'je t\'encule', '!Arsène '),
(14, 'je vais t\'exploser', '!Arsène '),
(15, 't\'es plus feminin qu\'une meuf', '!Arsène '),
(16, 'petite bitee', '!Arsène '),
(17, 'va mettre une jupe gros tas', '!Arsène '),
(18, 'tu pues ta mere', '!Arsène '),
(19, 'c\'est insane j\'en peux plus de te voir degage de ma vue stp', '!Arsène '),
(20, 'tu me donnes envie de me suicider', '!Arsène '),
(21, 'j\'ai l\'impression d\'etre maudit quand je te vois', '!Arsène '),
(22, 'tu degoutes', '!Arsène '),
(23, 'salope', '!Arsène '),
(24, 'nique ta mere', '!Arsène '),
(25, 'Enculé de Snoopy snoop', '!Arsène '),
(26, 'Ton père est parti chercher des cigarettes', '!Arsène '),
(27, 'schmuck', '!Arsène '),
(28, 'Ta mère ressemble a olivier', '!Arsène '),
(29, 'pute', '!Arsène '),
(30, 't\'es plus fragile qu\'un électeur de Benoît Hamon', '!Arsène '),
(31, 'raclure', '!Arsène '),
(32, 'moisissure', '!Arsène '),
(33, 'tu dois être allergique à la réussite c\'est pas possible autrement', '!Arsène '),
(34, 'tu serais pas sur la page Wikipédia des controverses ?', '!Arsène '),
(35, 'bah alors encore en train de boire sa pisse ?', '!Arsène '),
(36, 'Raclure de tits', '!Arsène '),
(37, 'titou', '!Arsène '),
(38, 'Manges tes oncles enfants de catin', '!Arsène '),
(39, 'ton père est parti chercher des cigarettes bolosse', '!Arsène '),
(40, 'si t\'étais du binaire tu vaudrais 0000', '!Arsène '),
(41, 'ta mère la chaudière', '!Arsène '),
(42, 'espece de joueur de LoL', '!Arsène '),
(43, 'je t\'aime... SIKE !!!! JE T\'AIME PAS FDPPPPP', '!Arsène '),
(44, 'ta mere fais de la gymnastique sur ma bite', '!Arsène '),
(45, 'si t\'etais en java tu serais un gaytter', '!Arsène '),
(46, 't\'auras pas ton S2 fdp', '!Arsène '),
(47, 'ta grosse calvasse là', '!Arsène '),
(48, 'si t\'étais en Python tu serais l\'instruction *pass*', '!Arsène '),
(49, 'imagine ta rater ton S1 SALE MERDE', '!Arsène '),
(50, 'pends toi comme les seins d\'une vieille', '!Arsène '),
(51, 'Pine ta daronne la mal bz', '!Arsène '),
(52, 'ton loyer tu le claques sur Habbo', '!Arsène '),
(53, 'j\'suis pas grossophobe mais j\'ai de la peine pour ta chaise', '!Arsène '),
(54, 'ta mere sur onlyfans', '!Arsène '),
(55, '?', '!Arsène '),
(56, 'Иди на хуй', '!Arsène '),
(57, 'vai te foder', '!Arsène '),
(58, 'Vai po caralho ! Merda, filho da puta!', '!Arsène '),
(59, 'спускать :))', '!Arsène '),
(60, 'Puttanaccia', '!Arsène '),
(61, 'vaffenculu', '!Arsène '),
(62, 'Muzza secca', '!Arsène '),
(63, 'Baullò', '!Arsène '),
(64, 'U tò culu', '!Arsène '),
(65, 'Pesciu porcu', '!Arsène '),
(66, 'Pinzuti di merda', '!Arsène '),
(67, 'Manghja merda mezz\'omu', '!Arsène '),
(68, 'ty chuju', '!Arsène '),
(69, 'spierdalaj', '!Arsène '),
(70, 'chuj ci w mordę', '!Arsène '),
(71, 'chuj ci w dupę', '!Arsène '),
(72, 'rucham ci matkę cwelu', '!Arsène '),
(73, 'sram ci na ryj', '!Arsène '),
(74, 'pierdolona dziwko', '!Arsène '),
(75, '시발새끼!', '!Arsène '),
(76, '개새끼!', '!Arsène '),
(77, '지랄하고 자빠졌네', '!Arsène '),
(78, 'ㅗ', '!Arsène '),
(79, 'ㅗㅗ', '!Arsène '),
(80, '썅노무 시키!', '!Arsène '),
(81, '아가리 여물어', '!Arsène '),
(82, 'je te déportée au brazil', '!Arsène '),
(83, 't moche', '!Arsène '),
(84, 'tu es la honte de ta lignée', '!Arsène '),
(85, 'fils de viol', '!Arsène '),
(86, 'Еблан', '!Arsène '),
(87, 'хуесос', '!Arsène '),
(88, 'пидорас', '!Arsène '),
(89, 'уебок', '!Arsène '),
(90, 'обсос', '!Arsène '),
(91, 'долбаеб объебанный', '!Arsène '),
(92, 'ابن العاهرة', '!Arsène '),
(93, 'يمارس الجنس مع والدتك', '!Arsène '),
(94, 'testa dis cazzo', '!Arsène '),
(95, 'тупорылая свинья', '!Arsène '),
(96, 'хохол ебаный', '!Arsène '),
(97, 'Hurensohn', '!Arsène '),
(98, 'ta mère la Moldue', '!Arsène '),
(99, 'scheiße', '!Arsène '),
(100, 'pk t\'es content d\'avoir ton S1 puisque t\'auras jamais ton S2', '!Arsène '),
(101, 'schlampe', '!Arsène '),
(102, 'simp', '!Arsène '),
(103, 'tes con', '!Arsène '),
(104, 't\'es beau quand tu t\'y mets', '!Arsène '),
(105, 'j\'ai cru apercevoir ton charisme dans Secrets d\'Histoire', '!Arsène '),
(106, 'arsene', '!Arsène ');

-- --------------------------------------------------------

--
-- Structure de la table `main`
--

CREATE TABLE `main` (
  `id` int NOT NULL,
  `count` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `main`
--

INSERT INTO `main` (`id`, `count`) VALUES
(1, 39303);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `id_users` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `nb_message` int NOT NULL DEFAULT '0',
  `points` float NOT NULL DEFAULT '0',
  `level` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `id_users`, `name`, `nb_message`, `points`, `level`) VALUES
(1, '464810880035717122', '!Arsène ', 10319, 29100, 12),
(2, '337700222358781954', 'Stefan ', 17516, 58218.1, 13),
(3, '690253989517852673', 'Raphaël', 2510, 5677.6, 9),
(4, '270957984069189633', '!Thomaaaas', 4908, 11912.4, 9);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `insultes`
--
ALTER TABLE `insultes`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `main`
--
ALTER TABLE `main`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `insultes`
--
ALTER TABLE `insultes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT pour la table `main`
--
ALTER TABLE `main`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
