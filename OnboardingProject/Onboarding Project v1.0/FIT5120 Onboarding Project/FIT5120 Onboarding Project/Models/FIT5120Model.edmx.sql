
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 03/10/2022 10:23:32
-- Generated from EDMX file: D:\2022S1\FIT5120\FIT5120 Onboarding Project\FIT5120 Onboarding Project\Models\FIT5120Model.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [FIT5120Database];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK_binInfounacceptables]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[unacceptablesSet] DROP CONSTRAINT [FK_binInfounacceptables];
GO
IF OBJECT_ID(N'[dbo].[FK_binInfoacceptables]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[acceptablesSet] DROP CONSTRAINT [FK_binInfoacceptables];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[binInfoSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[binInfoSet];
GO
IF OBJECT_ID(N'[dbo].[unacceptablesSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[unacceptablesSet];
GO
IF OBJECT_ID(N'[dbo].[acceptablesSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[acceptablesSet];
GO
IF OBJECT_ID(N'[dbo].[wasteCollectionSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[wasteCollectionSet];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'binInfoSet'
CREATE TABLE [dbo].[binInfoSet] (
    [bin_type] varchar(max)  NOT NULL,
    [bin_color] varchar(max)  NOT NULL,
    [avg_monthly_collected] float  NOT NULL
);
GO

-- Creating table 'unacceptablesSet'
CREATE TABLE [dbo].[unacceptablesSet] (
    [binInfo_bin_type] varchar(max)  NOT NULL,
    [unacceptable_items] varchar(max)  NOT NULL
);
GO

-- Creating table 'acceptablesSet'
CREATE TABLE [dbo].[acceptablesSet] (
    [binInfo_bin_type] varchar(max)  NOT NULL,
    [acceptable_items] varchar(max)  NOT NULL
);
GO

-- Creating table 'wasteCollectionSet'
CREATE TABLE [dbo].[wasteCollectionSet] (
    [bin_type] varchar(max)  NOT NULL,
    [postcode] varchar(max)  NOT NULL,
    [collection_time] varchar(max)  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [bin_type] in table 'binInfoSet'
ALTER TABLE [dbo].[binInfoSet]
ADD CONSTRAINT [PK_binInfoSet]
    PRIMARY KEY CLUSTERED ([bin_type] ASC);
GO

-- Creating primary key on [unacceptable_items] in table 'unacceptablesSet'
ALTER TABLE [dbo].[unacceptablesSet]
ADD CONSTRAINT [PK_unacceptablesSet]
    PRIMARY KEY CLUSTERED ([unacceptable_items] ASC);
GO

-- Creating primary key on [acceptable_items] in table 'acceptablesSet'
ALTER TABLE [dbo].[acceptablesSet]
ADD CONSTRAINT [PK_acceptablesSet]
    PRIMARY KEY CLUSTERED ([acceptable_items] ASC);
GO

-- Creating primary key on [postcode], [bin_type] in table 'wasteCollectionSet'
ALTER TABLE [dbo].[wasteCollectionSet]
ADD CONSTRAINT [PK_wasteCollectionSet]
    PRIMARY KEY CLUSTERED ([postcode], [bin_type] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [binInfo_bin_type] in table 'unacceptablesSet'
ALTER TABLE [dbo].[unacceptablesSet]
ADD CONSTRAINT [FK_binInfounacceptables]
    FOREIGN KEY ([binInfo_bin_type])
    REFERENCES [dbo].[binInfoSet]
        ([bin_type])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_binInfounacceptables'
CREATE INDEX [IX_FK_binInfounacceptables]
ON [dbo].[unacceptablesSet]
    ([binInfo_bin_type]);
GO

-- Creating foreign key on [binInfo_bin_type] in table 'acceptablesSet'
ALTER TABLE [dbo].[acceptablesSet]
ADD CONSTRAINT [FK_binInfoacceptables]
    FOREIGN KEY ([binInfo_bin_type])
    REFERENCES [dbo].[binInfoSet]
        ([bin_type])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_binInfoacceptables'
CREATE INDEX [IX_FK_binInfoacceptables]
ON [dbo].[acceptablesSet]
    ([binInfo_bin_type]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------