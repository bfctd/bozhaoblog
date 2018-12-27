/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50721
Source Host           : localhost:3306
Source Database       : zx-csj-shopping

Target Server Type    : MYSQL
Target Server Version : 50721
File Encoding         : 65001

Date: 2018-01-26 09:44:05
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for userinfo
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo` (
  `user_id` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `phone` char(12) NOT NULL,
  `username` char(50) NOT NULL,
  `password` char(50) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of userinfo
-- ----------------------------
INSERT INTO `userinfo` VALUES ('00000000001', '13207623002', '13207623002', 'Zj1396673812', '天津市');
INSERT INTO `userinfo` VALUES ('00000000002', '123', '点点点', 'ddddd', '');
