-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : dim. 18 sep. 2022 à 20:20
-- Version du serveur : 8.0.27
-- Version de PHP : 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `robot_battle`
--

-- --------------------------------------------------------

--
-- Structure de la table `boutique`
--

DROP TABLE IF EXISTS `boutique`;
CREATE TABLE IF NOT EXISTS `boutique` (
  `id_boutique` int NOT NULL AUTO_INCREMENT,
  `nbExemplaires` int DEFAULT NULL,
  `id_obj` int NOT NULL,
  PRIMARY KEY (`id_boutique`),
  UNIQUE KEY `id_obj` (`id_obj`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `objet`
--

DROP TABLE IF EXISTS `objet`;
CREATE TABLE IF NOT EXISTS `objet` (
  `id_obj` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `modAtt` int DEFAULT NULL,
  `modDef` int DEFAULT NULL,
  `modEsq` int DEFAULT NULL,
  `modPV` int DEFAULT NULL,
  `image` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_obj`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `objet`
--

INSERT INTO `objet` (`id_obj`, `nom`, `type`, `modAtt`, `modDef`, `modEsq`, `modPV`, `image`) VALUES
(1, 'Bouclier en bois', 'Bouclier', 0, 2, NULL, NULL, '/bouclier.png'),
(10, 'Bouclier de feu', 'Bouclier', NULL, 5, NULL, NULL, '/bouclierFeu.png'),
(11, 'Claymore', 'Arme', 3, NULL, NULL, NULL, '/claymore.png'),
(12, 'Hache ', 'Arme', 5, NULL, NULL, NULL, '/hache.png'),
(13, 'TorseMusclé', 'tenue', NULL, NULL, NULL, 15, '/torse.png'),
(14, 'Armure en or', 'tenue', NULL, NULL, NULL, 20, '/ArmureEnOr.png');

-- --------------------------------------------------------

--
-- Structure de la table `robot`
--

DROP TABLE IF EXISTS `robot`;
CREATE TABLE IF NOT EXISTS `robot` (
  `email` varchar(255) NOT NULL,
  `pseudo` varchar(50) DEFAULT NULL,
  `mdp` varchar(60) DEFAULT NULL,
  `force_rbt` int DEFAULT '10',
  `defense` int DEFAULT '10',
  `esquive` int DEFAULT '10',
  `pv` int DEFAULT '10',
  `niveau` int DEFAULT '1',
  `experience` int DEFAULT NULL,
  `argent` int DEFAULT '0',
  `id_arme` int DEFAULT NULL,
  `id_bouclier` int DEFAULT NULL,
  `id_tenue` int DEFAULT NULL,
  PRIMARY KEY (`email`),
  UNIQUE KEY `id_obj` (`id_arme`),
  UNIQUE KEY `id_obj_1` (`id_bouclier`),
  UNIQUE KEY `id_obj_2` (`id_tenue`),
  UNIQUE KEY `pseudo` (`pseudo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

--
-- Déchargement des données de la table `robot`
--

INSERT INTO `robot` (`email`, `pseudo`, `mdp`, `force_rbt`, `defense`, `esquive`, `pv`, `niveau`, `experience`, `argent`, `id_arme`, `id_bouclier`, `id_tenue`) VALUES
('Robot1@hotmail.fr', 'Robot1', 'TEST', 10, 10, 10, 10, 1, NULL, NULL, NULL, NULL, NULL),
('Robot2@hotmail.fr', 'Robot2', 'TEST', 10, 10, 10, 10, 1, NULL, NULL, NULL, NULL, NULL),
('toc@hotmail.fr', 'toc', 'toc', 10, 10, 10, 10, 1, NULL, 0, NULL, NULL, NULL),
('Valentin@hotmail.fr', 'Valenlou', 'TEST', 200, 10, 10, 10, 1, NULL, 100, 0, 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `sac`
--

DROP TABLE IF EXISTS `sac`;
CREATE TABLE IF NOT EXISTS `sac` (
  `email` varchar(255) NOT NULL,
  `idObjet` int NOT NULL,
  PRIMARY KEY (`email`,`idObjet`) USING BTREE,
  KEY `idObjet` (`idObjet`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

--
-- Déchargement des données de la table `sac`
--

INSERT INTO `sac` (`email`, `idObjet`) VALUES
('toc@hotmail.fr', 1);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `boutique`
--
ALTER TABLE `boutique`
  ADD CONSTRAINT `boutique_ibfk_1` FOREIGN KEY (`id_obj`) REFERENCES `objet` (`id_obj`);

--
-- Contraintes pour la table `sac`
--
ALTER TABLE `sac`
  ADD CONSTRAINT `sac_email` FOREIGN KEY (`email`) REFERENCES `robot` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sac_ibfk_1` FOREIGN KEY (`idObjet`) REFERENCES `objet` (`id_obj`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
