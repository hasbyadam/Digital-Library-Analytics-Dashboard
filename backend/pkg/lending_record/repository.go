package lendingRecord

import (
	"errors"

	"github.com/google/uuid"
	"github.com/hasbyadam/Digital-Library-Analytics-Dashboard/pkg/entity"
	"github.com/hasbyadam/Digital-Library-Analytics-Dashboard/rest/presenter"
	"gorm.io/gorm"
)

// Repository interface allows us to access the CRUD Operations.
type Repository interface {
	CreateLendingRecord(lendingRecord *entity.LendingRecord) (*entity.LendingRecord, error)
	UpdateLendingRecord(lendingRecord *entity.LendingRecord) (*entity.LendingRecord, error)
	FetchLendingRecordById(ID uuid.UUID) (*entity.LendingRecord, error)
	FetchLendingRecords() (*[]presenter.LendingRecord, error)
	DeleteLendingRecords(ID uuid.UUID) error
}
type repository struct {
	Db *gorm.DB
}

// NewRepo is the single instance repo that is being created.
func NewRepo(db *gorm.DB) Repository {
	return &repository{
		Db: db,
	}
}

func (r *repository) CreateLendingRecord(lendingRecord *entity.LendingRecord) (*entity.LendingRecord, error) {
	tx := r.Db.Table("digital_library.lending_records").Create(&lendingRecord)
	if tx.Error != nil {
		return nil, tx.Error
	}
	return lendingRecord, nil
}

func (r *repository) UpdateLendingRecord(lendingRecord *entity.LendingRecord) (*entity.LendingRecord, error) {
	tx := r.Db.Table("digital_library.lending_records").Where("id = ?", lendingRecord.ID).Updates(lendingRecord)
	if tx.Error != nil {
		return nil, tx.Error
	}
	return lendingRecord, nil
}

func (r *repository) FetchLendingRecordById(id uuid.UUID) (*entity.LendingRecord, error) {
	var lendingRecord entity.LendingRecord
	tx := r.Db.Table("digital_library.lending_records").Where("id = ?", id).First(&lendingRecord)
	if tx.Error != nil {
		return nil, tx.Error
	}
	if tx.RowsAffected == 0 {
		return nil, errors.New("lending record not found")
	}
	return &lendingRecord, nil
}

func (r *repository) FetchLendingRecords() (*[]presenter.LendingRecord, error) {
	var data []presenter.LendingRecord

    tx := r.Db.Table("digital_library.lending_records").Order("lending_records.created_at desc").
        Select("lending_records.*, books.*").
        Joins("left join digital_library.books on digital_library.lending_records.book_id = books.id").Where("lending_records.deleted_at IS NULL").
        Find(&data)

    if tx.Error != nil {
        return nil, tx.Error
    }

    return &data, nil
}

func (r *repository) DeleteLendingRecords(ID uuid.UUID) error {
	tx := r.Db.Table("digital_library.lending_records").Delete(&entity.LendingRecord{}, ID)
	if tx.Error != nil {
		return tx.Error
	}
	return nil
}
