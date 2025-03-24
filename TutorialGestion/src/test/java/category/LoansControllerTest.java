package category;

import com.ccsw.TutorialGestionClientes.TutorialGestionClientesApplication;
import com.ccsw.TutorialGestionClientes.loans.Model.LoansDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest(classes = TutorialGestionClientesApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class LoansControllerTest {

    private static final String LOCALHOST = "http://localhost:";
    private static final String SERVICE_PATH = "/loans";
    private static final int TOTAL_LOANS = 3;

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void findAllShouldReturnAllLoans() {
        ResponseEntity<List<LoansDto>> response = restTemplate.exchange(LOCALHOST + port + SERVICE_PATH, HttpMethod.GET, null, new ParameterizedTypeReference<List<LoansDto>>() {
        });

        assertNotNull(response);
        assertEquals(TOTAL_LOANS, response.getBody().size());
    }

    @Test
    public void saveShouldCreateOrUpdateLoan() {
        LoansDto loanDto = new LoansDto();
        // Configura loanDto con los datos necesarios

        HttpEntity<LoansDto> request = new HttpEntity<>(loanDto);
        ResponseEntity<Void> response = restTemplate.exchange(LOCALHOST + port + SERVICE_PATH, HttpMethod.PUT, request, Void.class);

        assertNotNull(response);
        assertEquals(500, response.getStatusCodeValue());
    }

    @Test
    public void deleteShouldRemoveLoan() {
        Long loanId = 1L; // Ajusta este valor según tus datos de prueba

        ResponseEntity<Void> response = restTemplate.exchange(LOCALHOST + port + SERVICE_PATH + "/" + loanId, HttpMethod.DELETE, null, Void.class);

        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
    }
}