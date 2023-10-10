package carFy.delivery.models.auto;

import org.springframework.data.domain.Page;

import org.springframework.data.domain.Pageable;

public interface AutoService {
    Page<AutoDto> findAll(Pageable pageable);
    AutoDto findById(Long id);
    AutoDto save(AutoDto dto) throws Exception;
    AutoDto update(AutoDto dto) throws Exception;
    void delete(Long id);
}
